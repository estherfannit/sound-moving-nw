import { Link } from 'react-router-dom';
import { options } from '../lib/content.js';

export default function Hub() {
  return (
    <main className="wrap">
      <p className="eyebrow">Sound Moving NW</p>
      <h1>Five website directions</h1>
      <p className="blurb">Pick an option below to step through its nine pages, or open one straight from its card.</p>
      <div className="cards">
        {options.map((o) => (
          <Link key={o.letter} className="card" to={`/option/${o.letter.toLowerCase()}`}>
            <span className="letter">{o.letter}</span>
            <strong>{o.label.replace(/^Option [A-E]: /, '')}</strong>
            <span>{o.blurb}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
