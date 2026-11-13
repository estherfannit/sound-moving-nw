# Sound Moving NW website

A static copy of the live site (https://hhwebsite.siteforge365.workers.dev/). Plain HTML, CSS and JavaScript, with no build step.

## Structure

- `index.html`: homepage. Sections in order: hero, ratings, services, our work, pricing, reviews, comparison, locations, documents, FAQ, our story, final call to action, footer. Anchors such as `#services-packing` jump within it.
- `quote.html`: online planner (the estimate form).
- `check-availability.html`, `estimate-link.html`, `bill-of-lading.html`, `terms-and-conditions.html`: linked pages.
- `articles.html` and `article-*.html`: Tips & Tricks articles.
- `images/`, `forms/`, `docs/`: photos, PDFs and licence images used by the pages.

## Running locally

    python3 -m http.server 8000

Then open http://localhost:8000/

## Notes

- Forms post to third-party services (web3forms, imgbb). Submissions go to the accounts those services are set up for.
- `images/articles/family-owned.jpg` and `images/articles/lower-costs.jpg` are missing on the live site too, so those articles show broken images.
