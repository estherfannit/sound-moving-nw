import json from '../content/options.json';

// Option E is built directly as React (src/options/ModernSite.jsx), not exported from design files.
const MODERN = {
  letter: 'E',
  dir: 'option-e-dynamic',
  label: 'Option E: Dynamic',
  blurb: 'Bold, modern and dynamic. Clean pricing and clear calls to action.',
  modern: true,
  pages: [{ slug: 'home', name: 'Home' }],
};

export const options = [...json, MODERN];

export function getOption(letter) {
  return options.find((o) => o.letter.toLowerCase() === letter?.toLowerCase());
}

export function getPage(letter, slug) {
  return getOption(letter)?.pages.find((p) => p.slug === slug);
}
