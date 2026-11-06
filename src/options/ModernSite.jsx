import { useState } from 'react';
import './modern.css';

// Option E: a single-page, dynamic take on the Sound Moving NW site. Facts come from
// the current site and the reference screenshots; nothing here is invented.
const IMG = '/assets/';
const LOGO = `${IMG}e24b40ec587ae6c258f6899791823097.jpg`;
const PHONE = '425-540-6440';
const TEL = 'tel:+14255406440';
const EMAIL = 'info@soundmovingnw.com';

const SERVICES = [
  { name: 'Residential Moving', price: 'From $140/hr', img: '525c1750c3afe9fe33687f6469e1023a.jpg', note: 'Houses, condos and apartments. Across town or across the state.' },
  { name: 'Commercial Moving', price: 'From $140/hr', img: 'c1143176347b0b145f9048848c5a6f02.jpg' },
  { name: 'Packing Services', price: 'From $60/hr', img: '9a80f5d432b9c9d144323cec35e6b23c.jpg' },
  { name: 'Oversized Furniture & Pianos', price: 'From $140/hr', img: '4ca1eac3c181143ab3932127d27704c8.jpg' },
  { name: 'Junk Removal & Donation', price: 'From $140/hr', img: 'fbb6dd2adc41e00d6bc6d6c9166d6832.jpg' },
  { name: 'Labor Only', price: 'From $140/hr', img: '1e376a8926d5695a95ce204f4213b122.jpg' },
];

const AREAS = ['Seattle', 'Lynnwood', 'Shoreline', 'Marysville', 'Everett', 'Edmonds', 'Bothell'];

const REVIEWS = [
  { text: 'Amazing moving company! Straight forward and no shady business. Ben, Austin and Derek were awesome for our move. They put us on their schedule for the date we requested and offered an amazing price.', who: 'Amy Cruz', source: 'Google' },
  { text: 'I needed last minute movers for a couple big items. Ben was super helpful on the call and they squeezed me in. The team was on time, professional, and efficient. Totally recommend!', who: 'Vanessa G.', source: 'Yelp' },
  { text: 'Fit me in at the last minute when another moving company ghosted me. Tim and Brayden were professional, speedy, careful, and considerate of my belongings. Sound Moving NW will be my first and only call.', who: 'Matt', source: 'Google' },
];

function Services() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];
  return (
    <section className="m-section" id="services">
      <p className="m-eyebrow">What we move</p>
      <h2 className="m-h2">Six ways we make moving easier.</h2>
      <div className="m-services">
        <ul className="m-tabs" role="tablist">
          {SERVICES.map((s, i) => (
            <li key={s.name}>
              <button
                role="tab"
                aria-selected={i === active}
                className={i === active ? 'on' : undefined}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="m-num">0{i + 1}</span>
                <span className="m-tab-name">{s.name}</span>
                <span className="m-tab-price">{s.price}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="m-feature">
          <img key={current.img} src={IMG + current.img} alt={current.name} />
          <div className="m-feature-caption">
            <strong>{current.name}</strong>
            <span>{current.price}</span>
            {current.note && <p>{current.note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ModernSite() {
  return (
    <div className="modern">
      <header className="m-header">
        <a className="m-brand" href="#top">
          <img src={LOGO} alt="" />
          <span>Sound Moving NW</span>
        </a>
        <nav className="m-nav" aria-label="On this page">
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#reviews">Reviews</a>
          <a href="#areas">Areas</a>
        </nav>
        <a className="m-btn m-btn-orange" href="#estimate">Free estimate</a>
      </header>

      <section className="m-hero" id="top">
        <img className="m-hero-img" src={IMG + '525c1750c3afe9fe33687f6469e1023a.jpg'} alt="" />
        <div className="m-hero-shade" />
        <div className="m-hero-copy">
          <p className="m-eyebrow">Seattle &amp; Lynnwood, since 1979</p>
          <h1>
            We carry <br />
            the heavy <span>stuff.</span>
          </h1>
          <p className="m-lead">
            Family owned movers with straight up pricing. Two crew and a truck from $140 an hour.
          </p>
          <div className="m-actions">
            <a className="m-btn m-btn-cream" href="#estimate">Get my online estimate</a>
            <a className="m-btn m-btn-ghost" href={TEL}>Call {PHONE}</a>
          </div>
        </div>
      </section>

      <div className="m-ticker" aria-label="Areas we serve">
        <div className="m-ticker-track">
          {[...AREAS, ...AREAS].map((a, i) => (
            <span key={i}>{a}</span>
          ))}
        </div>
      </div>

      <section className="m-stats" aria-label="Company facts">
        <div><strong>1979</strong><span>Family owned since</span></div>
        <div><strong>2,000+</strong><span>Moves completed</span></div>
        <div><strong>100+</strong><span>Five star reviews</span></div>
        <div><strong>$140</strong><span>Per hour, 2 movers + truck</span></div>
      </section>

      <Services />

      <section className="m-section m-cream" id="pricing">
        <p className="m-eyebrow m-eyebrow-dark">Pricing</p>
        <h2 className="m-h2">What will my move cost?</h2>
        <div className="m-price">
          <div>
            <span className="m-price-label">Large 1 or 2 bedroom · Approximate cost</span>
            <strong className="m-price-amount">$650 to $900</strong>
          </div>
          <dl>
            <dt>Crew &amp; time</dt>
            <dd>2 movers, 4 to 6 hours</dd>
            <dt>Items</dt>
            <dd>21 to 50 items</dd>
          </dl>
        </div>
        <p className="m-fine">
          These are averages for our company. Distance from our yard or between locations, the number of items,
          access, stairs and other factors can move the final bill up or down. Larger homes may need a second
          vehicle, and walkthroughs are available on request.
        </p>
      </section>

      <section className="m-section" id="reviews">
        <p className="m-eyebrow">Reviews</p>
        <h2 className="m-h2">100+ five star reviews.</h2>
        <div className="m-reviews">
          {REVIEWS.map((r) => (
            <figure key={r.who} className="m-review">
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                {r.who} <span>/ {r.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="m-section m-areas" id="areas">
        <p className="m-eyebrow">Where we move</p>
        <h2 className="m-h2">Across town or across the state.</h2>
        <ul className="m-area-list">
          {AREAS.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="m-cta" id="estimate">
        <h2>Ready when you are.</h2>
        <p>Tell us about your move and we&rsquo;ll send an estimate.</p>
        <div className="m-actions">
          <a className="m-btn m-btn-orange" href={`mailto:${EMAIL}`}>Email {EMAIL}</a>
          <a className="m-btn m-btn-ghost" href={TEL}>Call {PHONE}</a>
        </div>
        <p className="m-hours">Open daily, 6am to 8pm</p>
      </section>

      <footer className="m-footer">
        <div className="m-brand">
          <img src={LOGO} alt="" />
          <span>Sound Moving NW</span>
        </div>
        <p>{PHONE} · {EMAIL}</p>
        <p>Daily, 6am to 8pm</p>
      </footer>
    </div>
  );
}
