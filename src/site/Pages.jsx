import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { Button, Dialog, Photo, Reveal, useHead, useSite } from './ui.jsx';
import { Breadcrumbs } from './shared.jsx';
import { DocumentGrid, FaqTabs } from './Faq.jsx';
import { CONTACT, ESTIMATE_URL, FAQ_GROUPS, LICENCE, MAP_EMBED, PLACEHOLDER, SERVICES, LOCATIONS } from './data.js';

export function AboutPage() {
  const { openEstimate, openPopup } = useSite();
  useHead({
    title: 'Our Story | Sound Moving NW',
    description: 'Family owned since 1979. Read the Sound Moving NW story, meet the crew, and see our licence and insurance.',
  });
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[['Home', '/'], ['Our Story', null]]} />
          <p className="eyebrow eyebrow-light">About Sound Moving NW</p>
          <h1>Let Our Family Move Yours</h1>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <Reveal>
            <p>{PLACEHOLDER('family story paragraph 1')}</p>
            <p>{PLACEHOLDER('family story paragraph 2')}</p>
            <p>{PLACEHOLDER('family story paragraph 3')}</p>
          </Reveal>
          <Reveal>
            <Photo label="Sound Moving crew – Marysville, WA" alt="The Sound Moving NW crew in Marysville, WA" ratio="4 / 5" />
          </Reveal>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <h2>Licence &amp; insurance</h2>
          <div className="cards-2">
            <div className="card">
              <h3>Licence</h3>
              <p>{LICENCE}</p>
              <Button variant="outline" onClick={() => openPopup('licence')}>View licence details</Button>
            </div>
            <div className="card">
              <h3>Insurance</h3>
              <p>Fully insured: liability and cargo coverage on every move.</p>
              <Link className="text-link" to="/faq/#documents">Insurance certificate and documents</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="estimate-block">
        <div className="container">
          <h2>Ready when you are</h2>
          <Button onClick={openEstimate}>Get My Free Estimate</Button>
        </div>
      </section>
    </>
  );
}

// Job photos grouped by move type and city. All slots are placeholders until real job photos arrive.
export function WorkPage() {
  const { openEstimate } = useSite();
  useHead({
    title: 'Our Work | Sound Moving NW',
    description: 'See real moves by the Sound Moving NW crew, grouped by move type and city across Snohomish County.',
  });
  const groups = [
    { title: 'Residential moves', items: ['Residential move – Marysville, WA', 'Residential move – Everett, WA', 'Residential move – Lynnwood, WA'] },
    { title: 'Packing', items: ['Packing job – Marysville, WA', 'Packing job – North Seattle, WA'] },
    { title: 'Loading & unloading', items: ['Loading job – Everett, WA', 'Unloading job – Lynnwood, WA'] },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[['Home', '/'], ['Our Work', null]]} />
          <p className="eyebrow eyebrow-light">Our Work</p>
          <h1>Real moves by our local crew</h1>
        </div>
      </section>
      {groups.map((g) => (
        <section key={g.title} className="section">
          <div className="container">
            <h2>{g.title}</h2>
            <div className="gallery">
              {g.items.map((label) => <Photo key={label} label={label} alt={label} ratio="4 / 3" />)}
            </div>
          </div>
        </section>
      ))}
      <section className="estimate-block">
        <div className="container">
          <h2>Want your move to go like these?</h2>
          <Button onClick={openEstimate}>Get My Free Estimate</Button>
        </div>
      </section>
    </>
  );
}

// FAQ, Documents and Tips & Tricks on one simple page, with anchors used by the header.
export function FaqPage() {
  const { openEstimate } = useSite();
  const { hash } = useLocation();
  useHead({
    title: 'FAQ, Documents & Tips | Sound Moving NW',
    description: 'Answers to common moving questions, our licence and documents, and tips for a smoother move in Snohomish County.',
  });
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[['Home', '/'], ['FAQ, Documents & Tips', null]]} />
          <p className="eyebrow eyebrow-light">Got Questions?</p>
          <h1>FAQ, Documents &amp; Tips</h1>
        </div>
      </section>
      <section className="section" id="faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <FaqTabs groups={FAQ_GROUPS} />
        </div>
      </section>
      <section className="section section-alt" id="documents">
        <div className="container">
          <h2>Documents</h2>
          <DocumentGrid />
        </div>
      </section>
      <section className="section" id="tips">
        <div className="container">
          <h2>Tips &amp; Tricks</h2>
          <p>{PLACEHOLDER('Tips & Tricks content from the source site')}</p>
        </div>
      </section>
      <section className="estimate-block">
        <div className="container">
          <h2>Get Your Free Estimate in 2 Minutes</h2>
          <Button onClick={openEstimate}>Get My Free Estimate</Button>
        </div>
      </section>
    </>
  );
}

// Contact / Estimate page: the planner on-site, phones, email, hours, address and map.
export function ContactPage() {
  const { openEstimate } = useSite();
  useHead({
    title: 'Contact & Free Estimate | Sound Moving NW',
    description: 'Get your free moving estimate online, or call 425-540-6440. Open 8 AM to 6 PM daily from Marysville, WA.',
  });
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[['Home', '/'], ['Contact', null]]} />
          <p className="eyebrow eyebrow-light">Contact &amp; Estimate</p>
          <h1>Get your free estimate</h1>
          <div className="hero-actions">
            <Button onClick={openEstimate}>Get My Free Estimate</Button>
            <a className="btn btn-ghost" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2 id="planner">Online planner</h2>
            <iframe className="planner-frame planner-inline" src={ESTIMATE_URL} title="Online estimate planner" loading="lazy" />
            <p className="small">Planner not loading? <a href={ESTIMATE_URL} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>.</p>
          </div>
          <div className="contact-card">
            <h2 id="ask">Call or email</h2>
            <ul className="contact-list">
              <li><Phone aria-hidden="true" size={20} /> <a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
              <li><Phone aria-hidden="true" size={20} /> <a href={CONTACT.phone2Href}>{CONTACT.phone2}</a></li>
              <li><Phone aria-hidden="true" size={20} /> Free walk-through: <a href={CONTACT.walkthroughHref}>{CONTACT.walkthrough}</a></li>
              <li><Mail aria-hidden="true" size={20} /> <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><Clock aria-hidden="true" size={20} /> {CONTACT.hours}</li>
              <li><MapPin aria-hidden="true" size={20} /> {CONTACT.address}</li>
            </ul>
            <p className="small">Mailing address: {CONTACT.mailing}</p>
          </div>
        </div>
        <div className="container">
          <iframe className="map" src={MAP_EMBED} title="Map showing Sound Moving NW, 13733 Smokey Point Blvd, Marysville, WA" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  );
}
