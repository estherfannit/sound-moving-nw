import { useEffect, useRef, useState } from 'react';
import './modern.css';
import { FACEBOOK_PATH, GOOGLE_PATH, YELP_PATH } from './socialPaths.js';

// Option E: the Sound Moving NW site, rebuilt single page. Mobile first, white and blue
// with orange accents. Facts come from the live site; nothing here is invented.
const IMG = '/assets/';
const LOGO = `${IMG}e24b40ec587ae6c258f6899791823097.jpg`;
const LIVE = 'https://hhwebsite.siteforge365.workers.dev';

const PHONE = '425-540-6440';
const TEL = 'tel:+14255406440';
const WALK_PHONE = '360-548-9216';
const WALK_TEL = 'tel:+13605489216';
const EMAIL = 'info@soundmovingnw.com';

// Links to pages on the live site. Real subpages for the service and location items
// are not published yet, so those point at the matching section on this page.
const PLANNER = `${LIVE}/quote.html`;
const AVAILABILITY = `${LIVE}/check-availability.html`;
const BLOG = `${LIVE}/articles.html`;
const LICENSE_IMG = `${LIVE}/docs/license.png`;
const INSURANCE_IMG = `${LIVE}/docs/insurance.png`;
const GOOGLE_BIZ = 'https://www.google.com/maps/place/Sound+Moving+NW/@48.0561099,-122.1739659,17z';
const YELP = 'https://www.yelp.com/biz/sound-moving-nw-marysville-6';
const FACEBOOK = 'https://www.facebook.com/soundmovingnw';

const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'Our Work', href: '#our-work' },
  {
    label: 'Services',
    menu: [
      { label: 'Residential Moving', href: '#services-residential' },
      { label: 'Packing', href: '#services-packing' },
      { label: 'Loading & Unloading', href: '#services-loading' },
    ],
  },
  {
    label: 'Locations',
    menu: [
      { label: 'Marysville', href: '#loc-marysville' },
      { label: 'Everett', href: '#loc-everett' },
      { label: 'Lynnwood', href: '#loc-lynnwood' },
      { label: 'North Seattle', href: '#loc-north-seattle' },
    ],
  },
  { label: 'About', href: '#story' },
  { label: 'Blog', href: BLOG, external: true },
];

const TRUST = [
  { big: 'From $150/hr', small: 'Two movers and a truck', href: '#pricing' },
  { big: '50+ cities', small: 'Snohomish County and Seattle', href: '#areas' },
  { big: 'Licensed & insured', small: 'WA UTC HG069611 · View proof', dialog: true },
  { big: 'Since 1979', small: 'Family owned', href: '#story' },
];

const SERVICES = [
  { id: 'services-residential', name: 'Residential Moving', price: 'From $150/hr · 2 crew + truck', text: 'Houses, condos and apartments, across town or across the state.' },
  { name: 'Commercial Moving', price: 'From $150/hr · 2 crew + truck', text: 'Offices, workspaces and high-rises. Get back to work fast.' },
  { id: 'services-packing', name: 'Packing Services', price: 'From $70/hr', text: 'Packers and unpackers for your home or office.' },
  { name: 'Oversized Furniture & Pianos', price: 'From $150/hr', text: 'Large and odd-sized furniture, pianos and safes, moved with care.' },
  { name: 'Junk Removal & Donation', price: 'From $150/hr', text: 'Clear out what you no longer need, and donate what can be used.' },
  { id: 'services-loading', name: 'Labor Only', price: 'From $150/hr', text: 'Extra muscle for the heavy lifting, when you need it.' },
];

const WORK_PHOTOS = [
  { src: '0badd5f892f2d48b3b6435a89b10c630.jpg', alt: 'Crew talking with homeowners beside a loaded truck' },
  { src: '525c1750c3afe9fe33687f6469e1023a.jpg', alt: 'Two movers carrying a sofa' },
  { src: '4ca1eac3c181143ab3932127d27704c8.jpg', alt: 'Mover wrapping a sofa in plastic for protection' },
  { src: 'c1143176347b0b145f9048848c5a6f02.jpg', alt: 'Moving truck outside a home, with boxes and furniture' },
];

const TIERS = [
  { name: 'Studio / small 1 bedroom', items: '1–20 items', crew: '2 movers · 1–3 hours', cost: '$500–$650', note: 'Apartments and small single-room moves.' },
  { name: 'Large 1 or 2 bedroom', items: '21–50 items', crew: '2 movers · 4–6 hours', cost: '$800–$1,100', note: 'Common for 1 to 2 bedroom moves across town.' },
  { name: '3 bedroom', items: '51–100 items', crew: '3 movers · 6–9 hours', cost: '$1,350–$1,900', note: 'Our most common move. Full crew, full truck.' },
  { name: '4 bedroom', items: '101–200 items', crew: '3–4 movers · 7–9 hours', cost: '$1,900–$2,500', note: 'May need a second vehicle. Walk-through available.' },
  { name: '5 bedroom', items: '201–350 items', crew: '5–6 movers · 7–9 hours', cost: '$2,500–$3,600', note: 'Large home moves. Walk-through recommended.' },
];

const COMPARE = [
  ['Pricing', 'Upfront, no hidden fees', 'Sometimes hidden fees'],
  ['Estimate', 'Online in about 2 minutes', 'Usually requires a call'],
  ['Starting rate', 'From $150/hr', 'Often $180–$250/hr'],
  ['Crew', 'Same crew from start to finish', 'Varies'],
  ['Walk-through', 'Full walk-through before and after', 'Not always included'],
  ['Experience', '45+ years of moving', 'Varies by franchise'],
  ['Support', 'Live chat and fast response', 'Call center queues'],
];

const CITIES = [
  'Anacortes', 'Arlington', 'Bellingham', 'Bothell', 'Burlington', 'Camano', 'Edmonds', 'Everett',
  'Granite Falls', 'Lake Stevens', 'Lynnwood', 'Marysville', 'Mill Creek', 'Monroe', 'Mountlake Terrace',
  'Mukilteo', 'Seattle', 'Shoreline', 'Snohomish', 'Stanwood',
];

const LOCATIONS = [
  { id: 'loc-marysville', name: 'Marysville', text: 'Our home base. Family owned here since 1979.' },
  { id: 'loc-everett', name: 'Everett', text: 'Moves to and from Everett and nearby towns.' },
  { id: 'loc-lynnwood', name: 'Lynnwood', text: 'Moves to and from Lynnwood and south Snohomish County.' },
  { id: 'loc-north-seattle', name: 'North Seattle', text: 'Moves to and from North Seattle and nearby neighborhoods.' },
];

const FAQ = [
  ['Are you licensed and insured?', 'Yes. U.S. DOT # 4501511 and WA UTC # HG069611. We carry a $1,000,000 general liability policy plus full cargo coverage.'],
  ['Are your estimates binding?', 'No. Estimates are non-binding. Your final invoice is based on actual labor time, with a 2-hour minimum for local moves. If the job finishes early, you pay less.'],
  ['What valuation protection do you offer?', 'Under Washington UTC tariffs there are three options: basic protection at no cost (72 cents per pound per article), replacement cost with a $300 deductible ($1.40 per $100 of declared value), or replacement cost with no deductible ($1.85 per $100 of declared value).'],
  ['Can you move pianos and oversized items?', 'Yes. We move oversized, odd-sized and heavy furniture, including pianos and safes, with heavy-duty dollies, rigging straps and ramp equipment.'],
  ['How do you protect items in the rain?', 'Upholstered furniture is shrink-wrapped inside the home before it goes outdoors. We lay non-slip runners and drop cloths across entryways and hallways.'],
  ['How are your crews trained?', 'Every crew member completes at least 24 field shifts before working in a lead role on a client move.'],
];

const DOCS = [
  ['License (WA UTC permit HG069611)', LICENSE_IMG],
  ['Insurance certificate', INSURANCE_IMG],
  ['WAC 480-15', `${LIVE}/forms/02-WAC-480-15.pdf`],
  ['Tariff 15-C', `${LIVE}/forms/Tariff-15-C.pdf`],
  ['Valuation is not insurance', `${LIVE}/forms/05-Valuation-is-Not-Insurance.pdf`],
  ['Terms and conditions', `${LIVE}/terms-and-conditions.html`],
  ['Bill of lading', `${LIVE}/bill-of-lading.html`],
];

// Three example reviews already on the site. Replace or add with verified reviews.
const REVIEWS = [
  { text: 'Amazing moving company! Straight forward and no shady business. Ben, Austin and Derek were awesome for our move. They put us on their schedule for the date we requested and offered an amazing price.', who: 'Amy Cruz', source: 'Google' },
  { text: 'I needed last minute movers for a couple big items. Ben was super helpful on the call and they squeezed me in. The team was on time, professional, and efficient. Totally recommend!', who: 'Vanessa G.', source: 'Yelp' },
  { text: 'Fit me in at the last minute when another moving company ghosted me. Tim and Brayden were professional, speedy, careful, and considerate of my belongings. Sound Moving NW will be my first and only call.', who: 'Matt', source: 'Google' },
];

function SocialIcon({ path }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={path} />
    </svg>
  );
}

function NavDropdown({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="m-drop"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button type="button" className="m-nav-link m-drop-btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {item.label}
      </button>
      <ul className={open ? 'm-drop-menu open' : 'm-drop-menu'}>
        {item.menu.map((m) => (
          <li key={m.href}>
            <a href={m.href} onClick={() => { setOpen(false); onNavigate(); }}>
              {m.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <header className="m-header">
      <div className="m-bar">
        <a className="m-brand" href="#top" onClick={close}>
          <img src={LOGO} alt="" width="40" height="40" />
          <span>Sound Moving NW</span>
        </a>
        <nav id="m-nav-panel" className={menuOpen ? 'm-nav-panel open' : 'm-nav-panel'} aria-label="Main">
          {NAV.map((item) =>
            item.menu ? (
              <NavDropdown key={item.label} item={item} onNavigate={close} />
            ) : (
              <a
                key={item.label}
                className="m-nav-link"
                href={item.href}
                onClick={close}
                {...(item.external ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
        <div className="m-header-right">
          <a className="m-btn m-btn-primary m-btn-sm" href={AVAILABILITY}>
            Check Availability
          </a>
          <button
            type="button"
            className="m-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="m-nav-panel"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  );
}

function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Gentle auto-advance. It stops when the reader hovers or focuses, and never runs
  // for people who ask the system for reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 9000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (n) => setIndex((n + REVIEWS.length) % REVIEWS.length);
  const r = REVIEWS[index];

  return (
    <section className="m-section" id="reviews" aria-labelledby="reviews-title">
      <div className="m-wrap">
        <p className="m-eyebrow">What customers say</p>
        <h2 className="m-h2" id="reviews-title">Moves our customers recommend.</h2>
        <div
          className="m-quote"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <figure key={index} className="m-review">
            <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
            <figcaption>
              <strong>{r.who}</strong> · {r.source}
            </figcaption>
          </figure>
        </div>
        <div className="m-quote-controls">
          <button type="button" className="m-text-btn" onClick={() => go(index - 1)}>
            Previous
          </button>
          <div className="m-dots">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show review ${i + 1}`}
                aria-current={i === index}
                className={i === index ? 'on' : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button type="button" className="m-text-btn" onClick={() => go(index + 1)}>
            Next
          </button>
        </div>
        <p className="m-more">
          <a href={GOOGLE_BIZ} target="_blank" rel="noopener">Read our Google reviews</a>
          <a href={YELP} target="_blank" rel="noopener">Read our Yelp reviews</a>
        </p>
      </div>
    </section>
  );
}

export default function ModernSite() {
  const proofRef = useRef(null);
  const openProof = () => proofRef.current?.showModal();
  const closeProof = () => proofRef.current?.close();

  return (
    <div className="modern">
      <Header />

      {/* Hero: copy and buttons on the left, the online planner card alongside. */}
      <section className="m-hero" id="top">
        <div className="m-wrap m-hero-grid">
          <div className="m-hero-copy">
            <p className="m-eyebrow">Based in Marysville, WA · Serving Snohomish County &amp; Seattle</p>
            <h1>Local Movers You Can Actually Afford</h1>
            <h2 className="m-hero-sub">Know Your Cost Before Moving Day</h2>
            <p className="m-lead">
              Family-owned movers with straight-up pricing. Get your estimate online in about two minutes,
              with no sales call.
            </p>
            <div className="m-actions">
              <a className="m-btn m-btn-primary" href={PLANNER}>Start your online planner</a>
              <a className="m-btn m-btn-outline" href={TEL}>Call {PHONE}</a>
            </div>
          </div>

          <aside className="m-planner" aria-labelledby="planner-title">
            <h3 id="planner-title">Get your price online</h3>
            <ol>
              <li>Tell us about your home</li>
              <li>Pick your move date</li>
              <li>Get your estimate</li>
            </ol>
            <p className="m-fine">Takes about two minutes. Estimates are non-binding and based on actual labor time.</p>
            <a className="m-btn m-btn-primary m-btn-block" href={PLANNER}>Start your online planner</a>
          </aside>
        </div>
      </section>

      {/* Trust: four plain links, all the same style. The licence item opens a centred dialog. */}
      <div className="m-trust-wrap">
        <div className="m-wrap">
          <ul className="m-trust">
            {TRUST.map((t) => (
              <li key={t.big}>
                {t.dialog ? (
                  <button type="button" className="m-trust-link" onClick={openProof}>
                    <strong>{t.big}</strong>
                    <span>{t.small}</span>
                  </button>
                ) : (
                  <a className="m-trust-link" href={t.href}>
                    <strong>{t.big}</strong>
                    <span>{t.small}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="m-section" id="ratings" aria-labelledby="ratings-title">
        <div className="m-wrap">
          <p className="m-eyebrow">Ratings</p>
          <h2 className="m-h2" id="ratings-title">Rated 4.9 on Google and 5.0 on Yelp.</h2>
          <div className="m-ratings">
            <a className="m-rating" href={GOOGLE_BIZ} target="_blank" rel="noopener">
              <span className="m-rating-score">4.9</span>
              <span className="m-rating-label">Google · 94 reviews</span>
            </a>
            <a className="m-rating" href={YELP} target="_blank" rel="noopener">
              <span className="m-rating-score">5.0</span>
              <span className="m-rating-label">Yelp · 58+ reviews</span>
            </a>
          </div>
        </div>
      </section>

      <section className="m-section m-tint" id="services" aria-labelledby="services-title">
        <div className="m-wrap">
          <p className="m-eyebrow">Services</p>
          <h2 className="m-h2" id="services-title">Full-service moving, done right.</h2>
          <ul className="m-service-list">
            {SERVICES.map((s) => (
              <li key={s.name} id={s.id}>
                <h3>{s.name}</h3>
                <p className="m-price-line">{s.price}</p>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="m-section" id="our-work" aria-labelledby="work-title">
        <div className="m-wrap">
          <p className="m-eyebrow">Our work</p>
          <h2 className="m-h2" id="work-title">Moving day, in pictures.</h2>
          <div className="m-gallery">
            {WORK_PHOTOS.map((p) => (
              <img key={p.src} src={IMG + p.src} alt={p.alt} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="m-section m-tint" id="pricing" aria-labelledby="pricing-title">
        <div className="m-wrap">
          <p className="m-eyebrow">Pricing</p>
          <h2 className="m-h2" id="pricing-title">What a move costs, by home size.</h2>
          <p className="m-lead2">
            Rates start at $150/hr for two movers and a truck, $200/hr for three crew and $250/hr for four.
            Packing starts at $70/hr. Estimates are non-binding and based on actual labor time, with a 2-hour
            minimum on local moves.
          </p>
          <div className="m-tiers">
            {TIERS.map((t) => (
              <article key={t.name} className="m-tier">
                <h3>{t.name}</h3>
                <p className="m-tier-meta">{t.items} · {t.crew}</p>
                <p className="m-tier-cost">{t.cost}</p>
                <p className="m-tier-note">{t.note}</p>
              </article>
            ))}
            <div className="m-tier m-tier-cta">
              <h3>Not sure which size fits?</h3>
              <p className="m-tier-note">Start the online planner and we will price your exact move.</p>
              <a className="m-btn m-btn-primary m-btn-block" href={PLANNER}>Start your online planner</a>
            </div>
          </div>
          <p className="m-fine">
            These are approximate. Distance, stairs, access and the number of items can move the final bill.
            Payments accepted: cash, check, card, Venmo or Zelle.
          </p>
        </div>
      </section>

      <Reviews />

      <section className="m-section" id="why" aria-labelledby="why-title">
        <div className="m-wrap">
          <p className="m-eyebrow">Why us</p>
          <h2 className="m-h2" id="why-title">Local vs. The Big Guys</h2>
          <p className="m-lead2">
            National chains use call centers, hidden fees and changing crews. We are a local, family-owned company.
          </p>
          <div className="m-table-wrap">
            <table className="m-table">
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">Sound Moving NW</th>
                  <th scope="col">National chains</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([feature, us, them]) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    <td className="m-us">{us}</td>
                    <td>{them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="m-section m-tint" id="areas" aria-labelledby="areas-title">
        <div className="m-wrap">
          <p className="m-eyebrow">Where we work</p>
          <h2 className="m-h2" id="areas-title">Based in Marysville, serving Snohomish County and Puget Sound.</h2>
          <div className="m-loc-cards">
            {LOCATIONS.map((l) => (
              <article key={l.id} id={l.id} className="m-loc">
                <h3>{l.name}</h3>
                <p>{l.text}</p>
              </article>
            ))}
          </div>
          <h3 className="m-subhead">Cities we serve</h3>
          <ul className="m-cities">
            {CITIES.map((c) => (
              <li key={c}>{c}</li>
            ))}
            <li>+ Surrounding areas</li>
          </ul>
        </div>
      </section>

      <section className="m-section" id="faq" aria-labelledby="faq-title">
        <div className="m-wrap m-narrow">
          <p className="m-eyebrow">Questions</p>
          <h2 className="m-h2" id="faq-title">Frequently asked questions</h2>
          <div className="m-faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="m-section m-tint" id="story" aria-labelledby="story-title">
        <div className="m-wrap m-story">
          <div>
            <p className="m-eyebrow">Our story</p>
            <h2 className="m-h2" id="story-title">Let our family move yours.</h2>
            <p>
              Our father started his first moving company in 1979 and taught us from day one to be professional
              and focused on you, the customer.
            </p>
            <p>
              We have been learning the business since high school and carried that family tradition forward:
              putting customers first and delivering a move you can rest easy about.
            </p>
            <p>
              Sound Moving NW is fully licensed and insured, and every customer gets a personal experience.
            </p>
          </div>
          <dl className="m-stats">
            <div><dt>Years in the family business</dt><dd>45+</dd></div>
            <div><dt>Family owned since</dt><dd>1979</dd></div>
            <div><dt>Licensed and fully insured</dt><dd>WA UTC HG069611</dd></div>
            <div><dt>Ratings on Google and Yelp</dt><dd>4.9 and 5.0</dd></div>
          </dl>
        </div>
      </section>

      <section className="m-cta" id="estimate" aria-labelledby="cta-title">
        <div className="m-wrap m-cta-inner">
          <h2 id="cta-title">Get your free estimate in about two minutes.</h2>
          <p>Build your price in the online planner. Prefer to talk? Call us.</p>
          <div className="m-actions">
            <a className="m-btn m-btn-primary" href={PLANNER}>Start your online planner</a>
            <a className="m-btn m-btn-outline-light" href={TEL}>Call {PHONE}</a>
          </div>
        </div>
      </section>

      <footer className="m-footer">
        <div className="m-wrap m-footer-grid">
          <div>
            <a className="m-brand" href="#top">
              <img src={LOGO} alt="" width="40" height="40" />
              <span>Sound Moving NW</span>
            </a>
            <p className="m-fine">Family-owned movers based in Marysville, WA. Serving Snohomish County and Seattle since 1979.</p>
            <ul className="m-social" aria-label="Follow us">
              <li>
                <a href={FACEBOOK} target="_blank" rel="noopener" aria-label="Sound Moving NW on Facebook">
                  <SocialIcon path={FACEBOOK_PATH} />
                </a>
              </li>
              <li>
                <a href={YELP} target="_blank" rel="noopener" aria-label="Sound Moving NW on Yelp">
                  <SocialIcon path={YELP_PATH} />
                </a>
              </li>
              <li>
                <a href={GOOGLE_BIZ} target="_blank" rel="noopener" aria-label="Sound Moving NW on Google">
                  <SocialIcon path={GOOGLE_PATH} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="m-foot-h">Contact</h3>
            <p><a href={TEL}>{PHONE}</a><br />Main line</p>
            <p><a href={WALK_TEL}>{WALK_PHONE}</a><br />Walk-through</p>
            <p><a href={`mailto:${EMAIL}`}>Info@SoundMovingNW.com</a></p>
            <p className="m-fine">Open daily, 6am to 8pm</p>
          </div>
          <div>
            <h3 className="m-foot-h">Documents</h3>
            <ul className="m-doc-list">
              {DOCS.map(([label, href]) => (
                <li key={label}><a href={href} target="_blank" rel="noopener">{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="m-wrap m-copy">
          <p>© {new Date().getFullYear()} Sound Moving NW. All rights reserved.</p>
        </div>
      </footer>

      <dialog
        ref={proofRef}
        className="m-dialog"
        aria-labelledby="proof-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeProof();
        }}
      >
        <div className="m-dialog-body">
          <h2 id="proof-title">Licensed &amp; insured</h2>
          <ul className="m-proof-list">
            <li><strong>WA UTC permit</strong> HG069611</li>
            <li><strong>U.S. DOT #</strong> 4501511</li>
            <li><strong>General liability</strong> $1,000,000 policy, plus full cargo coverage</li>
          </ul>
          <p className="m-proof-links">
            <a href={LICENSE_IMG} target="_blank" rel="noopener">View license (UTC permit HG069611)</a>
            <a href={INSURANCE_IMG} target="_blank" rel="noopener">View insurance certificate</a>
          </p>
          <button type="button" className="m-btn m-btn-outline" onClick={closeProof}>Close</button>
        </div>
      </dialog>
    </div>
  );
}
