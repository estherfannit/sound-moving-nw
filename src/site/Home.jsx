import { useEffect, useState } from 'react';
import { Check, MapPin, Pause, Play, Shield, Star, Tag, X } from 'lucide-react';
import { Button, Photo, Reveal, useHead, useSite } from './ui.jsx';
import { Link } from 'react-router-dom';
import {
  CITIES, COMPARISON, COMPARISON_INTRO, CONTACT, FAQ_GROUPS, LINKED_CITIES, MAP_EMBED, PLACEHOLDER, PRICING_INTRO,
  REVIEWS, SERVICES, STEPS, STORY_STATS, TIERS, YELP_URL,
} from './data.js';
import { FaqTabs } from './Faq.jsx';

export function Hero() {
  const { openEstimate, openPopup } = useSite();
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">Based in Marysville, WA · Serving Western Washington</p>
          <h1>Local Movers You Can Actually Afford.</h1>
          <p className="lead">Skip the Sales Calls. Get your accurate online estimate in minutes with zero hidden fees.</p>
          <div className="hero-actions">
            <Button onClick={openEstimate}>Get My Free Estimate</Button>
            <a className="btn btn-ghost" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </div>
          <p className="hero-walk">Free Walk Thru: <a href={CONTACT.walkthroughHref}>{CONTACT.walkthrough}</a></p>
          <button className="hero-rating" onClick={() => openPopup('reviews')}>
            <Star aria-hidden="true" size={18} className="star" /> 5.0 · 150+ Reviews
          </button>
        </div>
        <div className="hero-media">
          <Photo label="Crew loading truck – Marysville, WA" alt="Sound Moving crew loading a moving truck in Marysville, WA" ratio="4 / 5" className="photo-hero" />
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const { openPopup } = useSite();
  const items = [
    { icon: Star, label: '5.0 · 150+ Reviews', popup: 'reviews' },
    { icon: Shield, label: 'Licensed & Insured', popup: 'licence' },
    { icon: Tag, label: 'Rates from $150/hr', popup: 'rates' },
    { icon: MapPin, label: 'Service Areas', popup: 'areas' },
  ];
  return (
    <section className="trust-strip" aria-label="Why people choose us">
      <div className="container trust-row">
        {items.map(({ icon: Icon, label, popup }) => (
          <button key={label} className="trust-item" onClick={() => openPopup(popup)}>
            <Icon aria-hidden="true" size={22} /> <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal>
          <p className="eyebrow">What We Do</p>
          <h2>Full-Service Moving, Done Right</h2>
        </Reveal>
        <div className="cards-3">
          {SERVICES.map((s) => (
            <Reveal key={s.slug} className="card service-card">
              <Photo label={s.image} alt={s.image} ratio="16 / 10" />
              <h3>{s.name}</h3>
              <p className="price-line"><strong>{s.from}</strong> <span>{s.fromNote}</span></p>
              <p>{s.desc}</p>
              <Link className="text-link" to={s.path}>Learn more</Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const { openEstimate } = useSite();
  return (
    <section className="section section-alt" id="pricing">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Transparent Pricing</p>
          <h2>Know Your Cost Before Moving Day</h2>
          <p className="intro">{PRICING_INTRO}</p>
        </Reveal>
        <div className="tiers">
          {TIERS.map((t) => (
            <Reveal key={t.tier} className={`card tier${t.highlight ? ' tier-highlight' : ''}`}>
              {t.highlight && <p className="tier-badge">Most common move</p>}
              <h3>{t.tier}</h3>
              <dl>
                <div><dt>Items</dt><dd>{t.items}</dd></div>
                <div><dt>Crew · time</dt><dd>{t.crew}</dd></div>
                <div><dt>Price</dt><dd className="tier-price">{t.price}</dd></div>
              </dl>
              <p className="small">{t.note}</p>
            </Reveal>
          ))}
          <Reveal className="card tier tier-cta">
            <h3>Not Sure?</h3>
            <p>Get a quote that fits your home and your schedule.</p>
            <Button onClick={openEstimate}>Get My Free Estimate</Button>
          </Reveal>
        </div>
        <p className="rates-note">
          <strong>Rates start at $150/hr (2 crew + truck)</strong> and $70/hr for packing. Payments accepted: Cash, Check, Card, Venmo, or Zelle.
        </p>
      </div>
    </section>
  );
}

// Auto-scrolling review carousel. Pauses on hover, focus, touch, and with the pause button.
export function ReviewCarousel() {
  const [tab, setTab] = useState('google');
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const set = REVIEWS[tab];
  const current = set.items[index % set.items.length];

  // Advance every 6 seconds unless paused (hover, focus, touch, or the pause button).
  useEffect(() => {
    if (paused || set.items.length < 2) return undefined;
    const id = setInterval(() => setIndex((i) => i + 1), 6000);
    return () => clearInterval(id);
  }, [paused, set.items.length]);

  function chooseTab(k) {
    setTab(k);
    setIndex(0);
  }

  return (
    <section className="section section-navy" id="reviews">
      <div className="container">
        <Reveal>
          <p className="eyebrow eyebrow-light">What Customers Say</p>
          <h2>Five-star reviews from our neighbours</h2>
        </Reveal>
        <div className="review-tabs" role="tablist" aria-label="Review source">
          {['google', 'yelp'].map((k) => (
            <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => chooseTab(k)}>
              {k === 'google' ? 'Google' : 'Yelp'} · {REVIEWS[k].score} · {REVIEWS[k].count}
            </button>
          ))}
        </div>
        <div
          className="review-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          aria-live={paused ? 'polite' : 'off'}
        >
          <figure className="review-card">
            <blockquote><p>“{current.text}”</p></blockquote>
            <figcaption><span className="avatar" aria-hidden="true">{current.who.charAt(0)}</span> {current.who} · {current.source}</figcaption>
          </figure>
          <div className="carousel-controls">
            <button className="icon-btn light" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play reviews' : 'Pause reviews'}>
              {paused ? <Play aria-hidden="true" size={18} /> : <Pause aria-hidden="true" size={18} />}
            </button>
            <button className="text-link light" onClick={() => setIndex((i) => i + 1)}>Next review</button>
          </div>
        </div>
        <p className="see-all">
          <a className="text-link light" href={YELP_URL} target="_blank" rel="noopener noreferrer">See all reviews on Yelp</a>
          <a className="text-link light" href="https://www.google.com/search?q=Sound+Moving+NW+Marysville+reviews" target="_blank" rel="noopener noreferrer">See all reviews on Google</a>
        </p>
      </div>
    </section>
  );
}

export function PlannerSteps() {
  const { openEstimate } = useSite();
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Simple Process</p>
          <h2>Moving Made Easy — 3 Steps</h2>
        </Reveal>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} className="step">
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <div className="planner-cta">
          <Button onClick={openEstimate} className="btn-large">Get My Free Estimate</Button>
          <p className="small">A real price from your item list. No callback wait.</p>
        </div>
      </div>
    </section>
  );
}

export function Comparison() {
  return (
    <section className="section section-alt" id="why">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Why Choose Us</p>
          <h2>Local vs. The Big Guys</h2>
          <p className="intro">{COMPARISON_INTRO}</p>
        </Reveal>
        <div className="table-scroll">
          <table className="compare">
            <thead>
              <tr><th scope="col">Compared on</th><th scope="col">Sound Moving NW</th><th scope="col">National Chains</th></tr>
            </thead>
            <tbody>
              {COMPARISON.map(([row, us, them]) => (
                <tr key={row}>
                  <th scope="row">{row}</th>
                  <td><Check className="tick" aria-label="Yes" size={20} /></td>
                  <td>{them === false ? <X className="cross" aria-label="No" size={20} /> : them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function ServiceAreas() {
  return (
    <section className="section" id="areas">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Where We Work</p>
          <h2>Based in Marysville, Serving all of Snohomish County &amp; Surrounding Areas of Puget Sound.</h2>
        </Reveal>
        <div className="chips">
          {CITIES.map((c) => (LINKED_CITIES[c]
            ? <Link key={c} to={LINKED_CITIES[c]} className="chip chip-link">{c}</Link>
            : <span key={c} className="chip">{c}</span>))}
          <span className="chip chip-muted">Surrounding Areas</span>
        </div>
        <iframe className="map" src={MAP_EMBED} title="Map showing Sound Moving NW in Marysville, WA" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="section section-alt">
      <div className="container split">
        <Reveal>
          <p className="eyebrow">Our Story</p>
          <h2>Let Our Family Move Yours</h2>
          <p>{PLACEHOLDER('Our Story paragraph 1 from the source site')}</p>
          <p>{PLACEHOLDER('Our Story paragraph 2 from the source site')}</p>
          <p>{PLACEHOLDER('Our Story paragraph 3 from the source site')}</p>
          <div className="stat-grid">
            {STORY_STATS.map((s) => (
              <div key={s.label} className="stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <Photo label="Sound Moving crew – Marysville, WA" alt="The Sound Moving NW crew standing together in Marysville, WA" ratio="4 / 5" />
        </Reveal>
      </div>
    </section>
  );
}

export function HomeFaq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Got Questions?</p>
          <h2>Frequently Asked Questions</h2>
        </Reveal>
        <FaqTabs groups={FAQ_GROUPS} />
      </div>
    </section>
  );
}

export function FinalCta() {
  const { openEstimate } = useSite();
  return (
    <section className="final-cta">
      <div className="container">
        <p className="eyebrow eyebrow-light">Ready to Move?</p>
        <h2>Get Your Free Estimate in 2 Minutes</h2>
        <p className="lead">No sales calls. No pressure. Just real pricing from a local team that's been doing this since 1979.</p>
        <div className="hero-actions">
          <Button onClick={openEstimate}>Get My Free Estimate</Button>
          <a className="btn btn-ghost" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        </div>
        <p className="hero-walk">Or call for a free walk-through: <a href={CONTACT.walkthroughHref}>{CONTACT.walkthrough}</a></p>
      </div>
    </section>
  );
}

export default function Home() {
  useHead({
    title: 'Movers in Marysville, WA | Sound Moving NW',
    description: 'Local movers in Marysville, WA. Family owned since 1979. Get your free online estimate in minutes, with zero hidden fees.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'MovingCompany',
      name: 'Sound Moving Northwest',
      telephone: CONTACT.phone,
      email: CONTACT.email,
      address: { '@type': 'PostalAddress', streetAddress: '13733 Smokey Point Blvd.', addressLocality: 'Marysville', addressRegion: 'WA', postalCode: '98271' },
      openingHours: 'Mo-Su 08:00-18:00',
      areaServed: CITIES,
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '94' },
    },
  });
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Pricing />
      <ReviewCarousel />
      <PlannerSteps />
      <Comparison />
      <ServiceAreas />
      <Story />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
