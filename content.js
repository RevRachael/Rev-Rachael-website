/*
  CONTENT FILE
  Add a new essay or talk here. The Home, Writing, and Watch pages update on their own.

  ESSAY fields
    title:    exactly as published on Medium
    url:      the Medium link
    question: which collection it belongs to on the Writing page (reuse an existing one, or write a new question)
    intro:    one or two sentences in Rachael's voice
    featured: true to show it on the Home page (keep three featured)
    related:  optional, the id of a talk on the Watch page

  TALK fields
    id:       the YouTube video id (the part after watch?v=)
    title:    the title shown on the site
    date:     when it was given
    blurb:    one or two sentences
    start:    optional, seconds into the video where playback should begin
    featured: true to show it on the Home page (keep one featured)
*/

window.ESSAYS = [
  {
    title: "Forgiveness Was Never About the Other Person",
    url: "https://medium.com/@rndilling/forgiveness-was-never-about-the-other-person-63bb20f38e58",
    question: "How do I let go?",
    intro: "My brother-in-law asked what good a forgiveness letter does if it's never mailed. My answer, and my father's story, are about where healing actually happens.",
    featured: true
  },
  {
    title: "Setting a Boundary Is Easy. Keeping It Is the Real Work.",
    url: "https://medium.com/@rndilling/setting-a-boundary-is-easy-keeping-it-is-the-real-work-ad0925820ee9",
    question: "Where do I end and others begin?",
    intro: "A hug politely declined at a kitchen table, and my grown daughter saying \"Mom, stop,\" taught me that honoring someone else's no is its own spiritual practice.",
    featured: true
  },
  {
    title: "Fear as a Flashlight, Not a Stoplight",
    url: "https://medium.com/@rndilling/fear-as-a-flashlight-not-a-stoplight-4428b6697799",
    question: "What is fear trying to tell me?",
    intro: "I almost didn't offer a friend my help because I was afraid I couldn't figure it out. Twenty hours of learning later, I understood what fear is actually for.",
    featured: true
  },
  {
    title: "Is It Just Nature? What My Meanest Chicken Taught Me About Choice",
    url: "https://medium.com/@rndilling/is-it-just-nature-what-my-meanest-chicken-taught-me-about-choice-ae71ed2f167d",
    question: "Do I have to repeat what was done to me?",
    intro: "Kruella spent her youth bullied by the older hens, then became the meanest bird in the coop the moment new chicks arrived. She can't stop mid-peck and choose differently. I can."
  },
  {
    title: "The Clarity That Only Struggle Could Give",
    url: "https://medium.com/@rndilling/the-clarity-that-only-struggle-could-give-bc2c4a55decf",
    question: "What is the hard part giving me?",
    intro: "Crying in a doorway in the middle of graduate school, I told my David I couldn't do it anymore. He said, \"But you're going to.\" Some strength is only forged through friction."
  },
  {
    title: "Where My Thoughts Go: Shadow Work and the One Mind",
    url: "https://medium.com/@rndilling/where-my-thoughts-go-shadow-work-and-the-one-mind-e71a18231061",
    question: "Does my inner work matter to anyone else?",
    intro: "If I'm immersed in everything humanity has ever thought, then everyone is immersed in what I think. Ernest Holmes, the One Mind, and why my healing was never only mine."
  }
];

window.TALKS = [
  {
    id: "fCohEObslcY",
    title: "A talk in Pasadena",
    date: "July 7, 2024",
    blurb: "A message I gave in Pasadena.",
    featured: true
  },
  {
    id: "CRN139zuG4U",
    title: "Sunday Celebration, CSL St. George",
    date: "July 26, 2026",
    blurb: "The full online Sunday Celebration, about an hour long, with my message included."
  },
  {
    id: "m_nVsDGM1xo",
    title: "Sunday Celebration, CSL St. George",
    date: "August 2025",
    blurb: "A Sunday message given in person at Centers for Spiritual Living St. George."
  },
  {
    id: "1O0CvzB_E40",
    title: "Sunday Service, CSL St. George",
    date: "June 22, 2025",
    blurb: "A Sunday message given in person at Centers for Spiritual Living St. George."
  },
  {
    id: "Xx42WUylaic",
    title: "Sunday Service, CSL St. George",
    date: "May 25, 2025",
    blurb: "A Sunday message at Centers for Spiritual Living St. George."
  },
  {
    id: "8U9tB8CfyRQ",
    title: "Sunday Service, CSL St. George",
    date: "April 27, 2025",
    blurb: "A Sunday message given in person and online at Centers for Spiritual Living St. George."
  },
  {
    id: "WcNpjXQdJH8",
    title: "Sunday Service, CSL St. George",
    date: "March 23, 2025",
    blurb: "A Sunday message given in person and online at Centers for Spiritual Living St. George."
  },
  {
    id: "9VCVkbevK3Q",
    title: "Sunday Service, CSL St. George",
    date: "February 23, 2025",
    blurb: "A Sunday message given in person and online at Centers for Spiritual Living St. George."
  },
  {
    id: "1HDM_XLAh7Y",
    title: "Sunday Service, CSL St. George",
    date: "November 24, 2024",
    blurb: "A Sunday message given in person and online at Centers for Spiritual Living St. George."
  },
  {
    id: "ROC67YhmhPw",
    title: "Sunday Service, CSL St. George",
    date: "October 27, 2024",
    blurb: "A Sunday message given in person at Centers for Spiritual Living St. George."
  },
  {
    id: "D6rP6So84fI",
    title: "Sunday Service, CSL St. George",
    date: "September 22, 2024",
    blurb: "A Sunday message shared online from Centers for Spiritual Living St. George."
  },
  {
    id: "iyMELpDhPYk",
    title: "Sunday Service, CSL St. George",
    date: "August 25, 2024",
    blurb: "A Sunday message shared online from Centers for Spiritual Living St. George."
  },
  {
    id: "oC9Eo0vX-vY",
    title: "A message in North Las Vegas, part one",
    date: "March 28, 2024",
    blurb: "The first part of a message I gave in North Las Vegas."
  },
  {
    id: "qkUTcIl-wBk",
    title: "A message in North Las Vegas, part two",
    date: "March 28, 2024",
    blurb: "The second part of the same message."
  }
];
