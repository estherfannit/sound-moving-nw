import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="wrap">
      <h1>Page not found</h1>
      <p>
        <Link to="/">Back to all options</Link>
      </p>
    </main>
  );
}
