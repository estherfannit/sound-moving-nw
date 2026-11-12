import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, MessageCircle, Phone, Star, X } from 'lucide-react';
import { Button, Dialog, EstimateDialog, useSite } from './ui.jsx';
import { CONTACT, FACEBOOK_URL, LICENCE, LINKED_CITIES, RATES, REVIEWS, SERVICES, YELP_URL, CITIES, LOCATIONS, PLACEHOLDER } from './data.js';

export const LOGO = '/assets/e24b40ec587ae6c258f6899791823097.jpg';

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Sound Moving Northwest home">
      <img src={LOGO} alt="Sound Moving Northwest badge logo" width="44" height="44" />
    </Link>
  );
}

// ---- Dropdown in the header (keyboard usable, closes on outside click and Escape) ----
function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (e.type === 'keydown' ? e.key === 'Escape' : !e.target.closest?.('.dropdown')) setOpen(false); };
    document.addEventListener('click', close);
    document.addEventListener('keydown', close);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', close); };
  }, [open]);
  return (
    <div className="dropdown">
      <button type="button" className="nav-btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {label} <ChevronDown aria-hidden="true" size={16} />
      </button>
      {open && <div className="dropdown-menu" onClick={() => setOpen(false)}>{children}</div>}
    </div>
  );
}

export function Header() {
  const { openEstimate } = useSite();
  const [shrunk, setShrunk] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setMenu(false), [pathname]);

  return (
    <header className={`site-header${shrunk ? ' is-shrunk' : ''}`}>
      <div className="container header-row">
        <Logo />
        <nav className="main-nav" aria-label="Main">
          <Dropdown label="What We Do">
            {SERVICES.map((s) => <NavLink key={s.slug} to={s.path}>{s.nav}</NavLink>)}
          </Dropdown>
          <Dropdown label="Prices">
            {RATES.map((r) => <Link key={r.crew} to="/#pricing">{r.crew} · {r.price}</Link>)}
          </Dropdown>
          <Dropdown label="Service Areas">
            {LOCATIONS.map((l) => <NavLink key={l.slug} to={l.path}>{l.nav}</NavLink>)}
            <Link to="/#areas">All areas</Link>
          </Dropdown>
          <Link className="nav-link" to="/#reviews">Reviews</Link>
          <Dropdown label="About">
            <Link to="/about/">Our Story</Link>
            <Link to="/our-work/">Our Work</Link>
            <Link to="/faq/#tips">Tips &amp; Tricks</Link>
            <Link to="/faq/#faq">FAQ</Link>
            <Link to="/faq/#documents">Documents</Link>
          </Dropdown>
        </nav>
        <a className="header-phone" href={CONTACT.phoneHref}><Phone aria-hidden="true" size={18} /> {CONTACT.phone}</a>
        <Button className="header-cta" onClick={openEstimate}>Check Availability →</Button>
        <button className="icon-btn menu-toggle" aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu((v) => !v)}>
          {menu ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        </button>
        <a className="icon-btn call-icon" href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phone}`}><Phone aria-hidden="true" size={22} /></a>
      </div>
      {menu && (
        <div id="mobile-menu" className="mobile-menu">
          <div className="container">
            <p className="mobile-group">What We Do</p>
            {SERVICES.map((s) => <NavLink key={s.slug} to={s.path}>{s.nav}</NavLink>)}
            <p className="mobile-group">Prices</p>
            <Link to="/#pricing">Rates &amp; pricing</Link>
            <p className="mobile-group">Service Areas</p>
            {LOCATIONS.map((l) => <NavLink key={l.slug} to={l.path}>{l.nav}</NavLink>)}
            <p className="mobile-group">About</p>
            <Link to="/about/">Our Story</Link>
            <Link to="/our-work/">Our Work</Link>
            <Link to="/faq/">FAQ, Documents &amp; Tips</Link>
            <Link to="/contact/">Contact</Link>
            <p className="mobile-group">Contact</p>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href={CONTACT.walkthroughHref}>Walk-through: {CONTACT.walkthrough}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
        </div>
      )}
    </header>
  );
}

// Sticky bottom action bar on phones only.
export function MobileBar() {
  const { openEstimate } = useSite();
  return (
    <div className="mobile-bar" role="region" aria-label="Quick actions">
      <Button className="mobile-bar-primary" onClick={openEstimate}>Get My Free Estimate</Button>
      <a className="btn btn-outline mobile-bar-call" href={CONTACT.phoneHref}><Phone aria-hidden="true" size={18} /> Call</a>
    </div>
  );
}

export function ChatBubble() {
  return (
    <Link className="chat-bubble" to="/contact/#ask" aria-label="Ask us a question">
      <MessageCircle aria-hidden="true" size={22} />
      <span>Questions?</span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="footer-lead">Offering great rates &amp; service for all of your moves to and from Snohomish County.</p>
          <p className="footer-badges"><span>Licensed</span><span>Insured</span><span>Est. 1979</span></p>
          <div className="social" aria-label="Review profiles">
            <a href={YELP_URL} target="_blank" rel="noopener noreferrer">Yelp</a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.google.com/search?q=Sound+Moving+NW+Marysville" target="_blank" rel="noopener noreferrer">Google</a>
          </div>
        </div>
        <div>
          <h3>Contact</h3>
          <p><a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · <a href={CONTACT.phone2Href}>{CONTACT.phone2}</a></p>
          <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <h3>Location</h3>
          <p>{CONTACT.address}</p>
          <h3>Mailing</h3>
          <p>{CONTACT.mailing}</p>
        </div>
        <div>
          <h3>Services</h3>
          {SERVICES.map((s) => <Link key={s.slug} to={s.path}>{s.nav}</Link>)}
          <h3>Locations</h3>
          {LOCATIONS.map((l) => <Link key={l.slug} to={l.path}>{l.nav}</Link>)}
        </div>
        <div>
          <h3>Quick links</h3>
          <Link to="/about/">Our Story</Link>
          <Link to="/our-work/">Our Work</Link>
          <Link to="/faq/">FAQ</Link>
          <Link to="/faq/#documents">Documents</Link>
          <Link to="/faq/#tips">Tips &amp; Tricks</Link>
          <Link to="/contact/">Contact &amp; Estimate</Link>
        </div>
      </div>
      <div className="container footer-legal">
        <p>© 2026 Sound Moving Northwest · All Rights Reserved · Part of Pyramid Group Inc.</p>
      </div>
    </footer>
  );
}

// ---- Pop-ups from the trust strip and header ----
const POPUP_TITLES = {
  rates: 'Rates',
  areas: 'Service Areas',
  whatWeDo: 'What We Do',
  reviews: 'Customer Reviews',
  licence: 'Licensed & Insured',
};

export function PopupHost() {
  const { popup, closePopup, openEstimate } = useSite();
  const title = POPUP_TITLES[popup];
  return (
    <Dialog open={!!popup} onClose={closePopup} title={title || ''}>
      {popup === 'rates' && (
        <>
          <ul className="rate-list">{RATES.map((r) => <li key={r.crew}><span>{r.crew}</span><strong>{r.price}</strong></li>)}</ul>
          <p>Packing from $70/hr. Payments accepted: Cash, Check, Card, Venmo, or Zelle.</p>
        </>
      )}
      {popup === 'areas' && (
        <>
          <p>Based in Marysville, serving all of Snohomish County &amp; surrounding areas of Puget Sound.</p>
          <div className="chips">{CITIES.map((c) => (LINKED_CITIES[c] ? <Link key={c} to={LINKED_CITIES[c]} className="chip chip-link" onClick={closePopup}>{c}</Link> : <span key={c} className="chip">{c}</span>))}</div>
        </>
      )}
      {popup === 'whatWeDo' && (
        <ul className="plain-list">{SERVICES.map((s) => <li key={s.slug}><Link to={s.path} onClick={closePopup}>{s.name}</Link> — {s.desc}</li>)}</ul>
      )}
      {popup === 'reviews' && (
        <div className="review-stack">
          {[...REVIEWS.google.items, ...REVIEWS.yelp.items].map((r) => (
            <blockquote key={r.who + r.source}><p>“{r.text}”</p><footer>{r.who} · {r.source}</footer></blockquote>
          ))}
        </div>
      )}
      {popup === 'licence' && (
        <>
          <p><strong>Licence:</strong> {LICENCE}</p>
          <p><strong>Fully insured:</strong> liability and cargo coverage on every move.</p>
          <p>{PLACEHOLDER('licence and insurance document links from the source site')}</p>
        </>
      )}
      <div className="popup-cta">
        <Button onClick={() => { closePopup(); openEstimate(); }}>Get My Free Estimate</Button>
      </div>
    </Dialog>
  );
}

export function SiteDialogs() {
  const { estimateOpen, closeEstimate } = useSite();
  return (
    <>
      <EstimateDialog open={estimateOpen} onClose={closeEstimate} />
      <PopupHost />
    </>
  );
}
