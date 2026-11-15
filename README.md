# Rev. Rachael Dilling website

This is the personal website for Rev. Rachael Dilling: minister, hospice chaplain, writer, and speaker. It is a simple static site with no build step, hosted on Cloudflare Pages.

## Pages

- `index.html` is the Home page
- `about.html` has the bio, How I Serve, and credentials
- `writing.html` gathers the essays into collections, each built around a question
- `watch.html` lists the YouTube talks
- `contact.html` handles speaking and workshop inquiries by email
- `404.html` is the "page not found" page

Styles live in `styles.css`. Photos are in `images`, and the fonts are stored in `fonts`, so they always load.

## Essays from Medium

Every Monday morning, a GitHub Action (`.github/workflows/medium.yml`) reads the Medium feed for @rndilling and copies each essay onto this site as its own page, named `essay-` followed by the essay's title. It also updates `essays-index.js`, which the Home and Writing pages read. When an essay has a page here, its links open that page instead of sending readers to Medium. Every essay page links back to Medium and tells search engines that Medium is the original source, so the two copies never compete.

Medium's feed only lists the ten most recent essays. Once an essay has been copied here it stays, so the collection grows week by week. Essays older than the feed reaches keep linking to Medium.

To pull new essays right away instead of waiting for Monday, open the Actions tab on GitHub, choose Import essays from Medium, and click Run workflow.

## Featuring an essay on the Home and Writing pages

Imported essays appear on the Writing page under Recent essays on their own. To also feature one in a themed collection or on the Home page, open `content.js` on GitHub and click the pencil icon to edit it. Find the list called `window.ESSAYS`, copy one of the existing entries (everything from its opening curly brace to its closing curly brace, plus the comma after it), and paste the copy right below. Change the title so it matches Medium exactly, paste the Medium link into `url`, and write a one or two sentence `intro` in your own voice. For `question`, either reuse one of the questions already there or write a new one, and the Writing page will create a new collection for it on its own. To show the essay on the Home page, add `featured: true` and remove `featured: true` from an older one, so three stay featured. Click Commit changes when you're done.

## Featuring a talk

Talks live in the same file, in the list called `window.TALKS`. The `id` is the part of the YouTube link after `watch?v=`. To start a talk at a strong moment instead of the beginning, add `start:` with the number of seconds into the video, for example `start: 754` for 12 minutes and 34 seconds. The talk marked `featured: true` is the one shown on the Home page.

## Publishing an update

Cloudflare Pages watches this repository. Every time a change is committed to the `main` branch, Cloudflare publishes the new version on its own, usually within a minute or two. There's nothing else to run.

## Connecting Cloudflare Pages (one time)

Sign in to the Cloudflare dashboard, open Workers & Pages, and choose Create, then the Pages tab, then Connect to Git. Pick the RevRachael/Rev-Rachael-website repository. On the build settings screen, leave Framework preset as None, leave Build command empty, and set Build output directory to `/`. Click Save and Deploy. The site will appear at an address ending in `pages.dev`, and a custom domain can be added later from the project's Custom domains tab.

## Changing the pages themselves

The HTML pages were written by hand and can be edited directly on GitHub. Keep the header and footer identical on every page so the navigation stays consistent.
