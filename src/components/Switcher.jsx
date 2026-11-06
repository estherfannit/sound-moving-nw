import { NavLink, useLocation } from 'react-router-dom';
import { options } from '../lib/content.js';

// Floating bottom pill: "All options" plus A to E. On a page it keeps the reviewer
// on the same page; on a landing it goes to that option's landing.
export default function Switcher() {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/option\/([a-e])(?:\/([a-z0-9-]+))?/i);
  const current = match?.[1]?.toLowerCase();
  const slug = match?.[2];

  return (
    <div className="sm-switch">
      <nav aria-label="Website options">
        <NavLink to="/" end className={() => (!current ? 'current' : undefined)}>
          All options
        </NavLink>
        {options.map((o) => {
          const l = o.letter.toLowerCase();
          const to = slug ? `/option/${l}/${slug}` : `/option/${l}`;
          return (
            <NavLink key={l} to={to} className={() => (current === l ? 'current' : undefined)}>
              Option {o.letter}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
