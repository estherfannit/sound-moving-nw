import { Link } from 'react-router-dom';
import { Award, Phone, Shield, Star } from 'lucide-react';
import { Button, useSite } from './ui.jsx';
import { CONTACT, LICENCE } from './data.js';

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map(([label, to], i) => (
          <li key={label}>{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}{i < items.length - 1 && <span aria-hidden="true"> / </span>}</li>
        ))}
      </ol>
    </nav>
  );
}

// Estimate block used on service and location pages: button, call link, trust badges.
export function EstimateBlock() {
  const { openEstimate, openPopup } = useSite();
  return (
    <section className="estimate-block" id="estimate">
      <div className="container">
        <h2>Get your free estimate</h2>
        <p>Our online planner gives you a real price from your item list. No callback wait.</p>
        <div className="hero-actions">
          <Button onClick={openEstimate}>Get My Free Estimate</Button>
          <a className="btn btn-outline-light" href={CONTACT.phoneHref}><Phone aria-hidden="true" size={18} /> {CONTACT.phone}</a>
        </div>
        <ul className="badges">
          <li><Shield aria-hidden="true" size={18} /> <button onClick={() => openPopup('licence')}>{LICENCE}</button></li>
          <li><Star aria-hidden="true" size={18} /> <button onClick={() => openPopup('reviews')}>5.0 · 150+ Reviews</button></li>
          <li><Award aria-hidden="true" size={18} /> No hidden fees</li>
        </ul>
      </div>
    </section>
  );
}
