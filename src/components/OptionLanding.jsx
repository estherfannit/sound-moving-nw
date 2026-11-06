import { Navigate, useParams } from 'react-router-dom';
import { getOption } from '../lib/content.js';
import NotFound from './NotFound.jsx';

// An option always opens on its home page.
export default function OptionLanding() {
  const { letter } = useParams();
  if (!getOption(letter)) return <NotFound />;
  return <Navigate to={`/option/${letter.toLowerCase()}/home`} replace />;
}
