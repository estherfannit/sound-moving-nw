import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button, Photo, Reveal, useHead, useSite } from './ui.jsx';
import { CONTACT, LOCATIONS, MAP_EMBED, PLACEHOLDER, REVIEWS, RATES, SERVICES, STEPS, CITIES } from './data.js';
import { Breadcrumbs, EstimateBlock } from './shared.jsx';

// Service page template: H1, what's included, from-price, how it works, related reviews, estimate block.
export function ServicePage({ service }) {
  const { openEstimate } = useSite();
  useHead({
    title: service.title,
    description: service.meta,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      serviceType: service.name,
      provider: { '@type': 'MovingCompany', name: 'Sound Moving Northwest', telephone: CONTACT.phone },
      areaServed: CITIES,
    },
  });
  const reviews = [...REVIEWS.google.items];
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[['Home', '/'], [service.name, null]]} />
          <p className="eyebrow eyebrow-light">{service.name}</p>
          <h1>{service.h1}</h1>
          <p className="lead"><strong>{service.from}</strong> · {service.fromNote}</p>
          <div className="hero-actions">
            <Button onClick={openEstimate}>Get My Free Estimate</Button>
            <a className="btn btn-ghost" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <Reveal>
            <h2>What's included</h2>
            <p className="lead">{service.desc}</p>
            <ul className="check-list">
              {[1, 2, 3, 4].map((n) => <li key={n}><CheckCircle2 aria-hidden="true" size={20} /> {PLACEHOLDER(`what's included item ${n} from the source site`)}</li>)}
            </ul>
          </Reveal>
          <Reveal>
            <Photo label={service.image} alt={service.image} ratio="4 / 3" />
          </Reveal>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <h2>How it works</h2>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section section-navy">
        <div className="container">
          <h2>What customers say</h2>
          <div className="review-stack">
            {reviews.map((r) => (
              <blockquote key={r.who + r.text.slice(0, 12)} className="review-plain"><p>“{r.text}”</p><footer>{r.who} · {r.source}</footer></blockquote>
            ))}
          </div>
        </div>
      </section>
      <EstimateBlock />
      <section className="section">
        <div className="container">
          <h2>Areas we serve</h2>
          <div className="chips">
            {LOCATIONS.map((l) => <Link key={l.slug} to={l.path} className="chip chip-link">{l.nav}</Link>)}
          </div>
          <p className="see-all"><Link className="text-link" to="/#pricing">See all pricing</Link></p>
        </div>
      </section>
    </>
  );
}

// Location page template: H1, local intro, nearby areas, local reviews, map, pricing summary, estimate block.
export function LocationPage({ location }) {
  const { openEstimate } = useSite();
  useHead({
    title: location.title,
    description: location.meta,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'MovingCompany',
      name: 'Sound Moving Northwest',
      telephone: CONTACT.phone,
      address: { '@type': 'PostalAddress', streetAddress: '13733 Smokey Point Blvd.', addressLocality: 'Marysville', addressRegion: 'WA', postalCode: '98271' },
      areaServed: location.name,
    },
  });
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[['Home', '/'], [location.name, null]]} />
          <p className="eyebrow eyebrow-light">Local movers · {location.name}</p>
          <h1>{location.h1}</h1>
          <p className="lead">Local intro for {location.name} {PLACEHOLDER('local intro, 2 lines')}</p>
          <div className="hero-actions">
            <Button onClick={openEstimate}>Get My Free Estimate</Button>
            <a className="btn btn-ghost" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>Local moving in {location.name}</h2>
          <p>{PLACEHOLDER(`unique local copy for ${location.name}, 300–600 words, neighbourhoods and nearby areas`)}</p>
          <h3>Nearby areas we serve</h3>
          <div className="chips">
            {location.nearby.map((c) => <span key={c} className="chip">{c}</span>)}
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container split">
          <div>
            <h2>Pricing summary</h2>
            <ul className="rate-list">{RATES.map((r) => <li key={r.crew}><span>{r.crew}</span><strong>{r.price}</strong></li>)}</ul>
            <p className="small">Packing from $70/hr. Estimates are based on distance, stairs, the number of items, and more.</p>
          </div>
          <div>
            <h2>What customers say</h2>
            <div className="review-stack">
              {[...REVIEWS.google.items, ...REVIEWS.yelp.items].map((r) => (
                <blockquote key={r.who + r.source} className="review-plain"><p>“{r.text}”</p><footer>{r.who} · {r.source}</footer></blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>Find us</h2>
          <iframe className="map" src={MAP_EMBED} title={`Map showing Sound Moving NW near ${location.name}, WA`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
      <EstimateBlock />
    </>
  );
}

export { SERVICES };
