(function () {
  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var essays = window.ESSAYS || [];
  var talks = window.TALKS || [];
  function talkById(id) { return talks.filter(function (t) { return t.id === id; })[0]; }

  function ytUrl(t) {
    return "https://www.youtube.com/watch?v=" + encodeURIComponent(t.id) + (t.start ? "&t=" + encodeURIComponent(t.start) + "s" : "");
  }

  function videoButton(t) {
    return '<a class="video" href="' + esc(ytUrl(t)) + '"' +
      ' style="background-image:url(https://i.ytimg.com/vi/' + esc(t.id) + '/hqdefault.jpg)"' +
      ' aria-label="Watch on YouTube: ' + esc(t.title) + ', ' + esc(t.date) + '"><span class="play" aria-hidden="true"></span></a>';
  }

  function talkHTML(t) {
    return '<article class="talk">' + videoButton(t) +
      "<h3>" + esc(t.title) + "</h3>" +
      '<p class="label">' + esc(t.date) + "</p>" +
      "<p>" + esc(t.blurb) + "</p>" +
      '<p class="links"><a href="' + esc(ytUrl(t)) + '">Watch the full talk on YouTube</a></p>' +
      "</article>";
  }

  // Home: featured essays
  var featured = document.getElementById("featured-essays");
  if (featured) {
    featured.innerHTML = essays.filter(function (e) { return e.featured; }).slice(0, 3).map(function (e) {
      return '<article class="card cream-card"><h3><a href="' + esc(e.url) + '">' + esc(e.title) + "</a></h3>" +
        "<p>" + esc(e.intro) + "</p>" +
        '<a class="more" href="' + esc(e.url) + '">Read on Medium</a></article>';
    }).join("");
  }

  // Home: featured talk
  var featuredTalk = document.getElementById("featured-talk");
  if (featuredTalk) {
    var ft = talks.filter(function (t) { return t.featured; })[0] || talks[0];
    if (ft) featuredTalk.innerHTML = talkHTML(ft);
  }

  // Writing page: collections grouped by question
  var collections = document.getElementById("collections");
  if (collections) {
    var order = [];
    var groups = {};
    essays.forEach(function (e) {
      if (!groups[e.question]) { groups[e.question] = []; order.push(e.question); }
      groups[e.question].push(e);
    });
    collections.innerHTML = order.map(function (q) {
      return '<section class="collection"><h2 class="question">' + esc(q) + "</h2>" +
        groups[q].map(function (e) {
          var rel = e.related ? talkById(e.related) : null;
          return '<article class="essay"><h3><a href="' + esc(e.url) + '">' + esc(e.title) + "</a></h3>" +
            "<p>" + esc(e.intro) + "</p>" +
            '<p class="links"><a href="' + esc(e.url) + '">Read on Medium</a>' +
            (rel ? '<a href="watch.html#' + esc(rel.id) + '">Related talk</a>' : "") +
            "</p></article>";
        }).join("") + "</section>";
    }).join("");
  }

  // Watch page: all talks
  var talkList = document.getElementById("talk-list");
  if (talkList) {
    talkList.innerHTML = talks.map(function (t) {
      return '<div id="' + esc(t.id) + '">' + talkHTML(t) + "</div>";
    }).join("");
  }

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
