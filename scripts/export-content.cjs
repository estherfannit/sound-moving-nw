// Renders each Design option (.dc.html) into static multi-page HTML.
// Page state is driven by the component's renderVals(); we run that script
// with a tiny DCLogic shim, then expand sc-if / sc-for and {{expr}} in the markup.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.join(__dirname, '..', 'design', 'source');
const OUT = path.join(__dirname, '..');

const OPTIONS = [
  { file: 'Option-D-Modern-Motion.dc.html', dir: 'option-d-modern-motion', letter: 'D', label: 'Option D: Modern Motion', blurb: 'Space Grotesk type on a dark navy hero.' },
  { file: 'Option-E-Upgraded-Draft.dc.html', dir: 'option-e-upgraded-draft', letter: 'E', label: 'Option E: Upgraded Draft Site', blurb: 'Plus Jakarta Sans type on navy.' },
];

class DCLogic {
  constructor(p) { this.props = p || {}; this.state = {}; }
  setState(s) { Object.assign(this.state, s); }
}

function slug(s) {
  return String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function loadComponent(src) {
  const m = src.match(/<script type="text\/x-dc" data-dc-script data-props='([^']*)'>([\s\S]*?)<\/script>/);
  if (!m) throw new Error('component script not found');
  const props = JSON.parse(m[1]);
  const defaults = {};
  for (const k of Object.keys(props)) if (k[0] !== '$') defaults[k] = props[k].default;
  const ctx = vm.createContext({ DCLogic });
  vm.runInContext(m[2] + '\n;globalThis.__C = Component;', ctx);
  return { C: ctx.__C, defaults };
}

function evalExpr(expr, scope) {
  const e = expr.trim();
  if (e === 'true') return true;
  if (e === 'false') return false;
  let v = scope;
  for (const part of e.split('.')) {
    if (v == null) return undefined;
    v = v[part];
  }
  return v;
}

// Shared per-page state used by navTarget().
let CUR = null;          // component instance rendering the current page
let CUR_PAGE = null;     // its page key
let FILE_FOR = {};       // page key -> file name

function navTarget(fn) {
  CUR.state.page = undefined;
  try { fn(); } catch (e) { /* window.scrollTo is absent outside a browser */ }
  const target = CUR.state.page;
  CUR.state.page = CUR_PAGE;
  return FILE_FOR[target] || 'index.html';
}

function leaf(t, scope) {
  // Buttons and links that navigate become plain links to the target page.
  t = t.replace(/<(button|a)\b([^>]*?)\sonClick="\{\{([^}]+)\}\}"([^>]*)>([\s\S]*?)<\/\1>/g,
    (m, tag, pre, expr, post, inner) => {
      const target = navTarget(evalExpr(expr, scope));
      const attrs = (pre + post).replace(/\stype="button"/, '').replace(/\shref="[^"]*"/, '');
      return `<a${attrs} href="${target}">${inner}</a>`;
    });
  return t.replace(/\{\{([^}]+)\}\}/g, (m, e) => {
    const v = evalExpr(e, scope);
    return v == null ? '' : String(v);
  });
}

function findClose(s, tag, from) {
  const open = `<${tag}`, close = `</${tag}>`;
  let depth = 1, i = from;
  for (;;) {
    const o = s.indexOf(open, i);
    const c = s.indexOf(close, i);
    if (c < 0) throw new Error('unclosed ' + tag);
    if (o >= 0 && o < c) { depth++; i = o + open.length; }
    else { depth--; if (depth === 0) return c; i = c + close.length; }
  }
}

function expand(s, scope) {
  let out = '', i = 0;
  const re = /<sc-(if|for)\b([^>]*)>/g;
  for (;;) {
    re.lastIndex = i;
    const m = re.exec(s);
    if (!m) { out += leaf(s.slice(i), scope); break; }
    out += leaf(s.slice(i, m.index), scope);
    const tag = m[1], attrs = m[2];
    const bodyStart = m.index + m[0].length;
    const closeIdx = findClose(s, 'sc-' + tag, bodyStart);
    const inner = s.slice(bodyStart, closeIdx);
    i = closeIdx + ('</sc-' + tag + '>').length;
    if (tag === 'if') {
      const v = attrs.match(/value="\{\{([^}]*)\}\}"/)[1];
      if (evalExpr(v, scope)) out += expand(inner, scope);
    } else {
      const list = attrs.match(/list="\{\{([^}]*)\}\}"/)[1];
      const as = attrs.match(/as="([^"]+)"/)[1];
      for (const item of (evalExpr(list, scope) || [])) out += expand(inner, { ...scope, [as]: item });
    }
  }
  return out;
}

function renderPage(comp, pageKey, title) {
  const inst = new comp.C(comp.defaults);
  inst.state.page = pageKey;
  const vals = inst.renderVals();
  CUR = inst; CUR_PAGE = pageKey;
  const body = expand(comp.inner, vals)
    .replace(/\/_blob\/([0-9a-f]{32})/g, '../assets/$1.jpg');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${comp.helmet}
</head>
<body>
${body}
</body>
</html>
`;
}

function pageKeys(comp) {
  const inst = new comp.C(comp.defaults);
  inst.state.page = 'home';
  const vals = inst.renderVals();
  const keys = [{ key: 'home', file: 'index.html', name: 'Home' }];
  vals.services.forEach((s, i) => keys.push({ key: 's' + i, file: `services-${slug(s.nav)}.html`, name: s.nav }));
  vals.locs.forEach((l, i) => keys.push({ key: 'l' + i, file: `locations-${slug(l.nav)}.html`, name: l.nav }));
  keys.push({ key: 'about', file: 'about.html', name: 'About' });
  keys.push({ key: 'work', file: 'work.html', name: 'Our Work' });
  return keys;
}

// Floating bottom pill, modelled on the Decksteriors option switcher:
// "All options" plus A to E, current option highlighted. `prefix` is the path
// from the current file to the site root, `file` keeps the reviewer on the same page.
const SWITCH_CSS = `
.sm-switch{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:50;max-width:calc(100vw - 24px)}
.sm-switch nav{display:flex;align-items:center;gap:4px;white-space:nowrap;border:1px solid rgba(255,255,255,.15);background:rgba(27,38,60,.94);padding:6px;border-radius:999px;box-shadow:0 12px 32px rgba(0,0,0,.25);backdrop-filter:blur(8px);font:600 13px/1 system-ui,sans-serif}
.sm-switch a{color:#fff;text-decoration:none;padding:10px 14px;border-radius:999px;min-height:20px}
.sm-switch a:hover{background:rgba(255,255,255,.12)}
.sm-switch a[aria-current="page"]{background:#F76E10;color:#1B263C;font-weight:800}
@media (max-width:520px){.sm-switch a{padding:9px 10px}}
body{padding-bottom:84px}
`;

function switcherHTML(prefix, currentLetter, file) {
  const links = OPTIONS.map(o => {
    const cur = o.letter === currentLetter ? ' aria-current="page"' : '';
    return `<a href="${prefix}${o.dir}/${file}"${cur}><span class="sm-long">Option </span>${o.letter}</a>`;
  }).join('');
  return `<style>${SWITCH_CSS}</style>
<div class="sm-switch"><nav aria-label="Website options"><a href="${prefix}index.html">All options</a>${links}</nav></div>`;
}

// Export every option's pages as data for the React app (src/content/options.json).
// Links between pages become app routes; images point at /assets.
const CONTENT = [];
for (const opt of OPTIONS) {
  const letter = opt.letter.toLowerCase();
  const src = fs.readFileSync(path.join(SRC, opt.file), 'utf8');
  const comp = loadComponent(src);
  const xdc = src.match(/<x-dc[^>]*>([\s\S]*?)<\/x-dc>/);
  const inner = xdc[1];
  const helmet = (inner.match(/<helmet>([\s\S]*?)<\/helmet>/) || [, ''])[1];
  comp.inner = inner.replace(/<helmet>[\s\S]*?<\/helmet>/, '');
  comp.helmet = helmet;
  const fonts = [...helmet.matchAll(/<link[^>]*href="([^"]+)"/g)].map(m => m[1].replace(/&amp;/g, '&'));
  const css = [...helmet.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n') +
    '\n.btn,.wide{box-sizing:border-box;max-width:100%}';

  const keys = pageKeys(comp);
  FILE_FOR = {};
  for (const k of keys) FILE_FOR[k.key] = k.file;
  const routeOf = file => `/option/${letter}/${file === 'index.html' ? 'home' : file.replace(/\.html$/, '')}`;

  const pages = keys.map(k => {
    const inst = new comp.C(comp.defaults);
    inst.state.page = k.key;
    const vals = inst.renderVals();
    CUR = inst; CUR_PAGE = k.key;
    const html = expand(comp.inner, vals)
      .replace(/\/_blob\/([0-9a-f]{32})/g, '/assets/$1.jpg')
      .replace(/href="([a-z0-9-]+\.html)"/g, (m, f) => `href="${routeOf(f)}"`);
    return { slug: k.file === 'index.html' ? 'home' : k.file.replace(/\.html$/, ''), name: k.name, html };
  });
  CONTENT.push({ letter: opt.letter, dir: opt.dir, label: opt.label, blurb: opt.blurb, fonts, css, pages });
  console.log(opt.letter, pages.length, 'pages');
}
fs.mkdirSync(path.join(OUT, 'src', 'content'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'src', 'content', 'options.json'), JSON.stringify(CONTENT));
console.log('wrote src/content/options.json');
