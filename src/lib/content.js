import options from '../content/options.json';

export { options };

export function getOption(letter) {
  return options.find((o) => o.letter.toLowerCase() === letter?.toLowerCase());
}

export function getPage(letter, slug) {
  return getOption(letter)?.pages.find((p) => p.slug === slug);
}
