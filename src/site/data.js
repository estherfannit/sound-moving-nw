// Facts and copy from the brief. Anything marked PLACEHOLDER is source copy that
// has not been supplied yet and must be replaced before launch.

export const PLACEHOLDER = (what) => `[PLACEHOLDER: ${what}]`;

export const CONTACT = {
  phone: '425-540-6440',
  phoneHref: 'tel:+14255406440',
  phone2: '206-372-3838',
  phone2Href: 'tel:+12063723838',
  walkthrough: '360-548-9216',
  walkthroughHref: 'tel:+13605489216',
  email: 'info@soundmovingnw.com',
  hours: '8 AM–6 PM daily',
  address: '13733 Smokey Point Blvd. Marysville, WA 98271',
  mailing: '5619 Martin Luther King Jr. Way S. Seattle, WA 98118',
};

export const ESTIMATE_URL = 'https://hhwebsite.siteforge365.workers.dev/quote.html';
export const YELP_URL = 'https://www.yelp.com/biz/sound-moving-nw-marysville-6';
export const FACEBOOK_URL = 'https://www.facebook.com/SoundmovingNW';
export const MAP_EMBED = 'https://www.google.com/maps?q=13733+Smokey+Point+Blvd+Marysville+WA+98271&output=embed';

export const LICENCE = 'UTC Permit HG069611';

export const SERVICES = [
  {
    slug: 'residential-moving',
    path: '/residential-moving/',
    nav: 'Residential Moving',
    name: 'Residential Moving',
    h1: 'Residential Movers in Snohomish County',
    from: 'From $150/hr',
    fromNote: '2 crew + truck',
    desc: 'Houses, condos, apartments — across town or across the state.',
    title: 'Residential Movers in Snohomish County | Sound Moving NW',
    meta: 'Houses, condos and apartments moved by a local crew. Get your free online estimate in minutes, no sales calls.',
    image: 'Residential move in progress – Snohomish County, WA',
  },
  {
    slug: 'packing',
    path: '/packing/',
    nav: 'Packing',
    name: 'Packing Services',
    h1: 'Packing Services in Marysville, WA',
    from: 'From $70/hr',
    fromNote: 'packing',
    desc: 'Experienced packers and unpackers for your home or office.',
    title: 'Packing Services in Marysville, WA | Sound Moving NW',
    meta: 'Experienced packers and unpackers for your home or office. Get a free online estimate for packing help today.',
    image: 'Packing team at work – Marysville, WA',
  },
  {
    slug: 'loading-unloading',
    path: '/loading-unloading/',
    nav: 'Loading & Unloading',
    name: 'Loading & Unloading',
    h1: 'Loading & Unloading Help in Snohomish County',
    from: 'From $150/hr',
    fromNote: '2 crew + truck',
    desc: 'When you just need some extra muscle — call the professionals.',
    title: 'Loading & Unloading Help in Snohomish County | Sound Moving NW',
    meta: 'Need extra muscle for loading or unloading? Our local crew handles the heavy lifting. Get your free estimate online.',
    image: 'Crew loading a moving truck – Snohomish County, WA',
  },
];

export const LOCATIONS = [
  {
    slug: 'marysville',
    path: '/movers-marysville-wa/',
    nav: 'Marysville',
    name: 'Marysville',
    h1: 'Movers in Marysville, WA',
    title: 'Movers in Marysville, WA | Sound Moving NW',
    meta: 'Local movers based in Marysville, WA. Family owned since 1979. Get your free online estimate in minutes.',
    nearby: ['Smokey Point', 'Arlington', 'Lake Stevens', 'Snohomish', 'Everett', 'Stanwood'],
  },
  {
    slug: 'everett',
    path: '/movers-everett-wa/',
    nav: 'Everett',
    name: 'Everett',
    h1: 'Movers in Everett, WA',
    title: 'Movers in Everett, WA | Sound Moving NW',
    meta: 'Movers serving Everett, WA from our Marysville base. Clear pricing and a local crew. Get your free online estimate.',
    nearby: ['Mukilteo', 'Lynnwood', 'Mill Creek', 'Marysville', 'Lake Stevens', 'Edmonds'],
  },
  {
    slug: 'lynnwood',
    path: '/movers-lynnwood-wa/',
    nav: 'Lynnwood',
    name: 'Lynnwood',
    h1: 'Movers in Lynnwood, WA',
    title: 'Movers in Lynnwood, WA | Sound Moving NW',
    meta: 'Local movers for Lynnwood, WA homes and apartments. Straight pricing and a crew that shows up on time. Get an estimate.',
    nearby: ['Mountlake Terrace', 'Mill Creek', 'Edmonds', 'Bothell', 'Shoreline', 'Everett'],
  },
  {
    slug: 'north-seattle',
    path: '/movers-north-seattle/',
    nav: 'North Seattle',
    name: 'North Seattle',
    h1: 'Movers in North Seattle',
    title: 'Movers in North Seattle | Sound Moving NW',
    meta: 'Movers for North Seattle and Shoreline moves, run by a local family crew. Get your free online estimate today.',
    nearby: ['Shoreline', 'Bothell', 'Mountlake Terrace', 'Lynnwood', 'Mill Creek', 'Edmonds'],
  },
];

export const TIERS = [
  { tier: 'Studio / Small 1BR', items: 'About 1–20', crew: '2 movers · 1–3 hours', price: '$500–$650 approx', note: 'Perfect for apartments and small single-room moves.' },
  { tier: 'Large 1BR / 2BR', items: 'About 21–50', crew: '2 movers · 4–6 hours', price: '$800–$1,100 approx', note: 'Great for 1–2 bedroom moves across town.' },
  { tier: '3 Bedroom', items: 'About 50–100', crew: '3 movers · 6–9 hours', price: '$1,350–$1,900 approx', note: 'Our most common move. Full crew, full truck, full service.', highlight: true },
  { tier: '4 Bedroom', items: 'About 101–200', crew: '3–4 movers · 7–9 hours', price: '$1,900–$2,500 approx', note: 'May require a second vehicle. Walk-through available on request.' },
  { tier: '5 Bedroom', items: 'About 201–350', crew: '5–6 movers · 7–9 hours', price: '$2,500–$3,600 approx', note: 'Large home moves. Walk-through recommended.' },
];

export const RATES = [
  { crew: '2 Crew & Truck', price: '$150/hr' },
  { crew: '3 Crew & Truck', price: '$200/hr' },
  { crew: '4 Crew & Truck', price: '$250/hr' },
];

export const COMPARISON = [
  ['Family-owned & locally operated', true, false],
  ['Upfront pricing with no hidden fees', true, 'Sometimes'],
  ['Online estimate in under 2 minutes', true, 'Usually requires a call'],
  ['Same crew from start to finish', true, false],
  ['Rates starting at $150/hr', true, 'Often $180–$250/hr'],
  ['Live chat & fast response', true, 'Call center queues'],
  ['Full walk-through before & after', true, 'Not always included'],
  ['45+ years of moving experience', true, 'Varies by franchise'],
];

export const REVIEWS = {
  google: { score: '4.9', count: '94 reviews', items: [
    { text: 'Amazing moving company! Straight forward and no shady business. Ben, Austin and Derek were awesome for our move. They put us on their schedule for the date we requested and offered an amazing price.', who: 'Amy C.', source: 'Google' },
    { text: 'Fit me in at the last minute when another moving company ghosted me. Tim and Brayden were professional, speedy, careful, and considerate of my belongings. Sound Moving NW will be my first and only call.', who: 'Matt', source: 'Google' },
  ] },
  yelp: { score: '5.0', count: '58+ reviews', items: [
    { text: 'I needed last minute movers for a couple big items. Ben was super helpful on the call and they squeezed me in. The team was on time, professional, and efficient. Totally recommend!', who: 'Vanessa G.', source: 'Yelp' },
  ] },
};

export const CITIES = ['Anacortes', 'Arlington', 'Bellingham', 'Bothell', 'Burlington', 'Camano', 'Edmonds', 'Everett', 'Granite Falls', 'Lake Stevens', 'Lynnwood', 'Marysville', 'Mill Creek', 'Monroe', 'Mountlake Terrace', 'Mukilteo', 'North Seattle', 'Shoreline', 'Snohomish', 'Stanwood'];
export const LINKED_CITIES = { Marysville: '/movers-marysville-wa/', Everett: '/movers-everett-wa/', Lynnwood: '/movers-lynnwood-wa/', 'North Seattle': '/movers-north-seattle/' };

export const FAQ_GROUPS = [
  { id: 'licensing', title: 'Licensing, Legitimacy & Valuation Protection', items: [
    'Licence and insurance',
    'Valuation options',
  ] },
  { id: 'estimates', title: 'Estimates, Rates & Pricing Structure', items: [
    'Binding vs non-binding estimates',
    'Unused time',
  ] },
  { id: 'packing', title: 'Packing, Crew Training & Specialty Items', items: [
    'Crew training',
    'Packing rules',
    'Oversized and specialty items',
  ] },
  { id: 'pnw', title: 'The Pacific Northwest Factor: Weather & Traffic Protocols', items: [
    'Rain protection',
    'I-5 and I-405 traffic',
  ] },
];

export const DOCUMENTS = [
  { title: 'License', desc: `UTC permit ${'HG069611'}.` },
  { title: 'Insurance certificate', desc: 'Proof of liability and cargo coverage.' },
  { title: 'WAC 480-15', desc: 'The state moving rules we follow.' },
  { title: 'Tariff 15-C', desc: 'Our published rate tariff.' },
  { title: 'Valuation Is Not Insurance', desc: 'What valuation coverage does and does not cover.' },
  { title: 'Terms & Conditions', desc: 'The terms that apply to your move.' },
  { title: 'Bill of Lading', desc: 'The contract you sign on moving day.' },
  { title: 'Estimate Link', desc: 'Open the online planner to get your estimate.' },
];

export const STEPS = [
  { title: 'Get Your Free Estimate', text: 'Use the online planner to get a real price from your item list. No callback wait.' },
  { title: 'Book Your Move Date', text: 'Pick a date that works for you and confirm your crew.' },
  { title: 'We Handle Everything', text: 'Our crew shows up, packs, loads, moves and unloads your home.' },
];

export const STORY_STATS = [
  { value: '45+', label: 'Years in the Family Business' },
  { value: '5★', label: 'Star Rated' },
  { value: 'Licensed', label: '& Fully Insured' },
  { value: 'Kind &', label: 'Respectful Staff' },
];

export const COMPARISON_INTRO = "National chains have call centers, hidden fees, and strangers handling your stuff. We're your neighbors — and it shows.";
export const PRICING_INTRO = 'Many factors can affect the final cost. Estimates are based on distance, stairs, the number of items, and more.';
