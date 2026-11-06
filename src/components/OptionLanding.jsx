import { Link, useParams } from 'react-router-dom';
import { getOption } from '../lib/content.js';
import NotFound from './NotFound.jsx';

export default function OptionLanding() {
  const { letter } = useParams();
  const option = getOption(letter);
  if (!option) return <NotFound />;

  return (
    <main className="wrap">
      <p className="eyebrow">Option {option.letter}</p>
      <h1>{option.label.replace(/^Option [A-E]: /, '')}</h1>
      <p className="blurb">{option.blurb}</p>
      <ul className="pages">
        {option.pages.map((p) => (
          <li key={p.slug}>
            <Link to={`/option/${letter.toLowerCase()}/${p.slug}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link className="cta" to={`/option/${letter.toLowerCase()}/home`}>
          Open Option {option.letter} home
        </Link>
      </p>
    </main>
  );
}
