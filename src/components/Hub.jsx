import { Link } from 'react-router-dom';
import { options } from '../lib/content.js';

// Image-only chooser: picking an option opens its home page straight away.
export default function Hub() {
  return (
    <main className="wrap hub">
      <img className="hub-logo" src="/assets/e24b40ec587ae6c258f6899791823097.jpg" alt="Sound Moving NW" />
      <div className="thumbs">
        {options.map((o) => {
          const l = o.letter.toLowerCase();
          return (
            <Link key={l} className="thumb" to={`/option/${l}/home`} aria-label={`Option ${o.letter}: ${o.label}`}>
              <img src={`/thumbs/${l}.jpg`} alt="" />
              <span className="letter">{o.letter}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
