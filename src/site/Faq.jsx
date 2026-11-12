import { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import { DOCUMENTS, FAQ_GROUPS, PLACEHOLDER } from './data.js';

// Tabs for FAQ groups, with an accordion of questions inside each.
export function FaqTabs({ groups = FAQ_GROUPS }) {
  const [active, setActive] = useState(groups[0].id);
  const group = groups.find((g) => g.id === active) || groups[0];
  return (
    <div className="faq">
      <div className="faq-tabs" role="tablist" aria-label="FAQ groups">
        {groups.map((g) => (
          <button key={g.id} role="tab" aria-selected={g.id === active} className={g.id === active ? 'on' : ''} onClick={() => setActive(g.id)}>
            {g.title}
          </button>
        ))}
      </div>
      <div className="accordion" role="tabpanel">
        {group.items.map((q, i) => (
          <details key={q} className="accordion-item" open={i === 0}>
            <summary>
              <span>{q}</span>
              <ChevronDown aria-hidden="true" size={20} />
            </summary>
            <p>{PLACEHOLDER(`answer to "${q}" from the source FAQ`)}</p>
          </details>
        ))}
      </div>
      {group.id === 'licensing' && (
        <div className="table-scroll">
          <table className="compare valuation">
            <caption>Valuation options</caption>
            <thead>
              <tr><th scope="col">Option 1</th><th scope="col">Option 2</th><th scope="col">Option 3</th></tr>
            </thead>
            <tbody>
              <tr><td>{PLACEHOLDER('option 1 details')}</td><td>{PLACEHOLDER('option 2 details')}</td><td>{PLACEHOLDER('option 3 details')}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function DocumentGrid() {
  return (
    <div className="doc-grid">
      {DOCUMENTS.map((d) => (
        <a key={d.title} className="card doc-card" href="#documents" aria-label={`${d.title} (link to be added)`}>
          <FileText aria-hidden="true" size={26} />
          <h3>{d.title}</h3>
          <p>{d.desc}</p>
          <span className="small">{PLACEHOLDER('file link from the source site')}</span>
        </a>
      ))}
    </div>
  );
}
