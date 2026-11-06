import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOption, getPage } from '../lib/content.js';
import NotFound from './NotFound.jsx';
import ModernSite from '../options/ModernSite.jsx';

// Renders one design page. The markup comes from the exported design source; links
// between pages are app routes, so they are handled client side.
export default function PageView() {
  const { letter, slug } = useParams();
  const navigate = useNavigate();
  const option = getOption(letter);
  const page = getPage(letter, slug);

  useEffect(() => {
    if (!option || !page) return;
    document.title = `${page.name} · ${option.label} · Sound Moving NW`;
    window.scrollTo(0, 0);
  }, [option, page]);

  if (option?.modern) return <ModernSite />;
  if (!option || !page) return <NotFound />;

  function onClick(event) {
    const a = event.target.closest('a');
    const href = a?.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      event.preventDefault();
      navigate(href);
    }
  }

  return (
    <>
      {option.fonts.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <style>{option.css}</style>
      <div className="sm-page" onClick={onClick} dangerouslySetInnerHTML={{ __html: page.html }} />
    </>
  );
}
