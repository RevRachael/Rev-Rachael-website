// Copies Rachael's published essays from her Medium RSS feed onto the website.
// Runs weekly from .github/workflows/medium.yml. Usage:
//   node scripts/fetch-medium.mjs                (reads the live Medium feed)
//   node scripts/fetch-medium.mjs sample.xml     (reads a saved feed file, for testing)
//
// For each essay in the feed it writes essay-<slug>.html in the site's root folder,
// then rewrites essays-index.js, which the Home and Writing pages read to link to
// the essay pages on this site instead of sending readers to Medium.

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const FEED_URL = "https://medium.com/feed/@rndilling";
const SITE = "https://rev-rachael-website.pages.dev";
const ROOT = new URL("..", import.meta.url).pathname;

function between(xml, tag) {
  const re = new RegExp("<" + tag + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + tag + ">");
  const m = xml.match(re);
  return m ? unCdata(m[1]).trim() : "";
}
function all(xml, tag) {
  const re = new RegExp("<" + tag + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + tag + ">", "g");
  return [...xml.matchAll(re)].map((m) => unCdata(m[1]).trim());
}
function unCdata(s) {
  const m = s.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return m ? m[1] : decodeEntities(s);
}
function decodeEntities(s) {
  return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function stripTags(s) {
  return s.replace(/<\/(p|h[1-6]|li|figure|blockquote)>/gi, " ").replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

// Medium link looks like https://medium.com/@rndilling/some-title-63bb20f38e58?source=rss...
function parseLink(link) {
  const clean = link.split("?")[0];
  const last = clean.split("/").filter(Boolean).pop() || "";
  const m = last.match(/^(.*)-([0-9a-f]{8,16})$/);
  return { url: clean, slug: m ? m[1] : last, id: m ? m[2] : last };
}

function cleanBody(html, title) {
  let h = html;
  // Remove scripts, iframes, inline event handlers (defensive)
  h = h.replace(/<script[\s\S]*?<\/script>/gi, "");
  h = h.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
  h = h.replace(/\son\w+="[^"]*"/gi, "");
  // Remove Medium's tracking pixel
  h = h.replace(/<img[^>]*medium\.com\/_\/stat[^>]*>/gi, "");
  // Remove Medium's "was originally published in" footer
  h = h.replace(/<hr>\s*<p>[\s\S]*?was originally published in[\s\S]*?<\/p>\s*$/i, "");
  // Remove a heading at the very top that repeats the title
  const titleText = stripTags(title).toLowerCase();
  h = h.replace(/^\s*<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i, (whole, inner) =>
    stripTags(inner).toLowerCase() === titleText ? "" : whole
  );
  // Outside links open normally
  h = h.replace(/\starget="_blank"/gi, "");
  return h.trim();
}

function formatDate(pub) {
  const d = new Date(pub);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Los_Angeles" });
}

async function main() {
  const source = process.argv[2];
  let xml;
  if (source) {
    xml = await readFile(source, "utf8");
  } else {
    const res = await fetch(FEED_URL, { headers: { "User-Agent": "Mozilla/5.0 (rev-rachael-website essay import)" } });
    if (!res.ok) throw new Error("Medium feed returned " + res.status);
    xml = await res.text();
  }
  if (!xml.includes("<item>")) throw new Error("No essays found in the Medium feed");

  const template = await readFile(ROOT + "templates/essay.html", "utf8");

  // Keep essays imported in earlier weeks, since the feed only lists the most recent ten
  const indexPath = ROOT + "essays-index.js";
  let existing = [];
  if (existsSync(indexPath)) {
    const txt = await readFile(indexPath, "utf8");
    const m = txt.match(/window\.ESSAY_PAGES\s*=\s*(\[[\s\S]*\]);?/);
    if (m) existing = JSON.parse(m[1]);
  }
  const byId = new Map(existing.map((e) => [e.id, e]));

  const items = xml.split("<item>").slice(1).map((chunk) => chunk.split("</item>")[0]);
  let written = 0;
  for (const item of items) {
    const title = between(item, "title");
    const { url, slug, id } = parseLink(between(item, "link"));
    const pub = between(item, "pubDate");
    const raw = between(item, "content:encoded");
    if (!title || !raw) continue;

    const partial = /Continue reading on/i.test(raw);
    const body = cleanBody(raw, title);
    const text = stripTags(body);
    const excerpt = text.length > 220 ? text.slice(0, 217).replace(/\s+\S*$/, "") + "..." : text;
    const imgMatch = body.match(/<img[^>]+src="([^"]+)"/i);
    const image = imgMatch ? imgMatch[1] : SITE + "/images/rachael-sweater.jpg";
    const file = "essay-" + slug + ".html";

    let bodyHtml = body;
    if (partial) {
      bodyHtml += '\n<p class="continue"><a class="btn solid" href="' + escapeHtml(url) + '">Continue reading on Medium</a></p>';
    }

    const html = template
      .replaceAll("{{TITLE}}", escapeHtml(title))
      .replaceAll("{{DESC}}", escapeHtml(excerpt))
      .replaceAll("{{DATE}}", escapeHtml(formatDate(pub)))
      .replaceAll("{{URL}}", escapeHtml(url))
      .replaceAll("{{IMAGE}}", escapeHtml(image))
      .replace("{{BODY}}", bodyHtml);
    await writeFile(ROOT + file, html);
    written++;

    byId.set(id, {
      id,
      title,
      page: file,
      url,
      date: new Date(pub).toISOString().slice(0, 10),
      excerpt,
      categories: all(item, "category"),
      partial
    });
  }

  const list = [...byId.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
  await writeFile(
    indexPath,
    "// Written automatically by scripts/fetch-medium.mjs. Do not edit by hand.\nwindow.ESSAY_PAGES = " + JSON.stringify(list, null, 2) + ";\n"
  );
  console.log("Imported " + written + " essays; " + list.length + " essay pages listed.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
