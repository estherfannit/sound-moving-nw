import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { ESTIMATE_URL } from './data.js';

// ---- Modal state shared across the site (estimate planner + pop-ups) ----
export const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);

export function SiteProvider({ children }) {
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const openEstimate = useCallback(() => setEstimateOpen(true), []);
  const closeEstimate = useCallback(() => setEstimateOpen(false), []);
  const openPopup = useCallback((name) => setPopup(name), []);
  const closePopup = useCallback(() => setPopup(null), []);
  return (
    <SiteContext.Provider value={{ openEstimate, openPopup, estimateOpen, closeEstimate, popup, closePopup }}>
      {children}
    </SiteContext.Provider>
  );
}

// ---- Focus-trapped dialog ----
export function Dialog({ open, onClose, title, children, wide = false, label }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const node = ref.current;
    const focusables = () => [...node.querySelectorAll('a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])')];
    (focusables()[0] || node).focus();
    function onKey(e) {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (previous && previous.focus) previous.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="dialog-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`dialog${wide ? ' dialog-wide' : ''}`} role="dialog" aria-modal="true" aria-label={label || title} ref={ref} tabIndex={-1}>
        <div className="dialog-head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X aria-hidden="true" size={22} />
          </button>
        </div>
        <div className="dialog-body">{children}</div>
      </div>
    </div>
  );
}

// ---- Full-screen planner, on-site (iframe) with a direct link fallback ----
export function EstimateDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} title="Get My Free Estimate" wide label="Online estimate planner">
      <iframe className="planner-frame" src={ESTIMATE_URL} title="Online estimate planner" loading="lazy" />
      <p className="small">
        The planner not loading? <a href={ESTIMATE_URL} target="_blank" rel="noopener noreferrer">Open the planner in a new tab</a>.
      </p>
    </Dialog>
  );
}

// ---- Buttons ----
export function Button({ variant = 'primary', href, onClick, children, className = '', ...rest }) {
  const cls = `btn btn-${variant} ${className}`.trim();
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a className={cls} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

// ---- Labelled photo slot: no stock or AI images until real photos arrive ----
export function Photo({ label, alt, ratio = '4 / 3', className = '' }) {
  return (
    <figure className={`photo ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={alt || label}>
      <figcaption>
        <span className="photo-tag">Photo slot</span>
        <span>{label}</span>
      </figcaption>
    </figure>
  );
}

// ---- Fade in on scroll (motion is minimal by design) ----
export function Reveal({ children, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal${shown ? ' is-shown' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  );
}

// ---- Page title, description and JSON-LD for each route ----
export function useHead({ title, description, jsonLd }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = description;
    const old = document.getElementById('page-jsonld');
    if (old) old.remove();
    if (jsonLd) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = 'page-jsonld';
      s.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(s);
    }
  }, [title, description, jsonLd]);
}
