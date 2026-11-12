import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ChatBubble, Footer, Header, MobileBar } from './site/layout.jsx';
import { SiteDialogs } from './site/layout.jsx';
import Home from './site/Home.jsx';
import { ServicePage, LocationPage } from './site/Templates.jsx';
import { AboutPage, ContactPage, FaqPage, WorkPage } from './site/Pages.jsx';
import { SERVICES, LOCATIONS } from './site/data.js';
import { Reveal } from './site/ui.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <section className="section"><div className="container"><h1>Page not found</h1><p><a href="/">Back to the homepage</a></p></div></section>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {SERVICES.map((s) => <Route key={s.slug} path={s.path} element={<ServicePage service={s} />} />)}
          {LOCATIONS.map((l) => <Route key={l.slug} path={l.path} element={<LocationPage location={l} />} />)}
          <Route path="/about/" element={<AboutPage />} />
          <Route path="/our-work/" element={<WorkPage />} />
          <Route path="/faq/" element={<FaqPage />} />
          <Route path="/contact/" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatBubble />
      <MobileBar />
      <SiteDialogs />
    </>
  );
}
