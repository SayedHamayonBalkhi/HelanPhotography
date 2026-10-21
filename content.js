/* ==========================================================================
   HELAN EVENT PHOTOGRAPHY — CONTENT.JS
   This is the ONE file you edit to change the website's words, photos,
   categories, testimonials, social links and form settings.

   It is loaded before script.js as a plain global object (window.HELAN_CONTENT),
   so no build tools or modules are needed. Keep the commas and quote marks
   exactly as they are when you edit.
   ========================================================================== */

window.HELAN_CONTENT = {

  /* ---------- Brand ---------- */
  brand: {
    name: "Helan Event Photography",
    wordmark: "Helan",                       // short name shown in the header
    tagline: "Every moment deserves to be remembered."
  },

  /* ---------- Top navigation ----------
     "requires: testimonials" hides that link until at least one approved
     testimonial exists (see the testimonials section below). */
  nav: [
    { label: "Work",         href: "work.html" },
    { label: "About",        href: "index.html#about" },
    { label: "Testimonials", href: "testimonials.html", requires: "testimonials" },
    { label: "Contact",      href: "index.html#contact" }
  ],

  /* ---------- Home page: hero ----------
     photoId must match an "id" in the photos list at the bottom of this file. */
  hero: {
    eyebrow: "EVENT & LIFESTYLE PHOTOGRAPHY",
    titleLines: ["REAL MOMENTS.", "LASTING STORIES."],
    italicLine: 2,                            // which title line is italic (1, 2 ... or 0 for none)
    intro: "Photography for the moments, people, and details worth remembering. From meaningful celebrations to the beauty of everyday life, we capture each story with care and intention.",
    primaryCta:   { label: "Explore the Portfolio",           href: "work.html" },
    secondaryCta: { label: "Let\u2019s Talk About Your Event", href: "#contact" },
    photoId: "wedding-henna-circle"
  },

  /* ---------- Home page: selected work ----------
     Which photos appear here is decided by "featured: true" on each photo. */
  featuredSection: {
    eyebrow: "Selected work",
    heading: "A few favourite frames",
    linkLabel: "View all work",
    linkHref: "work.html"
  },

  /* ---------- Categories ----------
     "id" must match the "category" of the photos and the folder name inside Photos/.
     A category with no visible photos is hidden automatically (Food and
     Anniversaries are listed here but have no photos yet).
     coverPhotoId = the photo used on the home page category card. */
  categoriesSection: {
    eyebrow: "Browse",
    heading: "Find your story"
  },
  categories: [
    { id: "Wedding",       slug: "wedding",       label: "Wedding",
      subtitle: "Celebrations, traditions, and the details in between.",
      coverPhotoId: "wedding-beach-proposal" },
    { id: "Food",          slug: "food",          label: "Food",
      subtitle: "Tables, flavours, and the care behind them.",
      coverPhotoId: "" },
    { id: "Anniversaries", slug: "anniversaries", label: "Anniversaries",
      subtitle: "Years together, remembered beautifully.",
      coverPhotoId: "" },
    { id: "Nature",        slug: "nature",        label: "Nature",
      subtitle: "Light, sky, and quiet in-between moments.",
      coverPhotoId: "nature-lake-dock-sunset" },
    { id: "Kids",          slug: "kids",          label: "Kids",
      subtitle: "Little ones, family milestones, and everything that comes with them.",
      coverPhotoId: "kids-siblings-kiss" }
  ],

  /* ---------- Work page ---------- */
  workPage: {
    eyebrow: "Portfolio",
    heading: "Work",
    intro: "A growing collection of celebrations, family milestones, and quiet moments. Choose a category, or browse everything together.",
    allLabel: "All work",
    allDescription: "Every photograph in the collection."
  },

  /* ---------- About ---------- */
  about: {
    eyebrow: "About",
    heading: "More than images.",
    intro: "At Helan Event Photography, photographs are more than images. They hold the emotions, connections, and little details that make every moment personal. Our approach is thoughtful, creative, and focused on telling each story in a natural and meaningful way.",
    approachHeading: "Our Approach",
    approach: "Every session begins with understanding what matters to you. We pay attention to the atmosphere, the people, and the details, creating photographs that feel personal rather than staged.",
    photoId: "kids-maternity-woodland"        // set to "" for a text-only About section
  },

  /* ---------- Why Choose Us (statements are editable; set display:false to hide one) ---------- */
  whyChoose: {
    enabled: true,
    heading: "Why Choose Us",
    items: [
      { title: "Personal Attention",   text: "Taking time to understand your ideas and expectations.", display: true },
      { title: "Attention to Detail",  text: "Noticing meaningful expressions, careful compositions, and small details.", display: true },
      { title: "A Thoughtful Process", text: "Communicating clearly and helping you understand each step.", display: true },
      { title: "Careful Presentation", text: "Presenting selected photographs with consistent and considered editing.", display: true }
    ]
  },

  /* ---------- Testimonials ----------
     Only add real, approved words.
     - display: true   -> shown on testimonials.html (all of them, always)
     - featured: true  -> ALSO eligible for the home page preview. Each time the home
                          page loads, 1 or 2 different featured testimonials are picked at random.
     - name (optional) -> shown under the quote. If left out, defaultAttribution is used.
     - Blank lines inside "text" (\n\n) become separate paragraphs.
     Example:
       { id: "review-005", text: "Exact approved words", name: "Name (only with permission)",
         category: "Wedding", display: true, featured: true }
  */
  testimonials: {
    homeHeading: "What Our Clients Say",
    homeLinkLabel: "Read All Testimonials",
    pageHeading: "What Our Clients Say",
    pageIntro: "Kind words from people who trusted Helan to capture their special moments.",
    defaultAttribution: "Client Feedback",
    emptyMessage: "Client reviews will be shared here soon.",
    items: [
      {
        id: "testimonial-001",
        text: "Hi Helan,\n\nI wanted to send a quick note to tell you how absolutely thrilled I am with the photos from our session! Working with you was such a fantastic experience from start to finish.\n\nI am usually a bit camera-shy, but your warm personality and professional guidance made me feel completely comfortable and natural behind the lens.\n\nYou have an incredible eye for detail, and you captured the moments so beautifully. The final gallery is stunning. The lighting, editing, and quality completely exceeded my expectations.\n\nThank you so much for your hard work and talent.",
        display: true, featured: true
      },
      {
        id: "testimonial-002",
        text: "Frames full of memories @helanphotogaphy",
        display: true, featured: true
      },
      {
        id: "testimonial-003",
        text: "Such stunning photography! \u2728 You have a real talent for turning moments into beautiful memories. Thank you for sharing your amazing work! \uD83E\uDD0D",
        display: true, featured: true
      },
      {
        id: "testimonial-004",
        text: "Your photos are absolutely beautiful! \uD83D\uDE0D Thank you for capturing such special moments so perfectly. Keep up the amazing work! \uD83D\uDCF8\u2764\uFE0F",
        display: true, featured: true
      },
      {
        id: "testimonial-005",
        text: "Oh my goodness, I am Crying all over again! you didn\u2019t just take photos; you perfectly captured the absolute shock, joy, and magic of the split second. thank you for making us feel so comfortable and preserving this unforgettable milestone so beautifully!",
        display: true, featured: true
      }
    ]
  },

  /* ---------- Closing call to action + contact form ---------- */
  contact: {
    heading: "Let\u2019s Make Something Worth Remembering.",
    copy: "Have a special date coming up, a story to tell, or an idea you\u2019d love to bring to life? Tell us a little about it and get in touch.",
    email: "Helan.Balkhi@gmail.com",                                 // public email address to display (leave "" to hide)
    quickHeading: "Prefer to reach out directly?",
    /* Quick Contact area (beside the form). Mobile uses contact.phone, Email uses contact.email,
       Instagram uses social.instagram. While a detail is empty, a clearly marked placeholder row is
       shown instead (set showPlaceholders to false to hide empty rows completely). */
    showPlaceholders: true,
    quickLabels: { phone: "Mobile", instagram: "Instagram", email: "Email" },
    quickPlaceholders: { phone: "Number coming soon", instagram: "Profile coming soon", email: "Address coming soon" },

    /* ---- One-click contact buttons (header, footer, contact section) ----
       Fill these in with REAL details. Anything left "" is simply not shown.
       whatsapp: the business WhatsApp number with country code, e.g. "+1 555 123 4567"
                 (spaces, brackets and + are removed automatically; the link becomes
                 https://wa.me/15551234567?text=...). While this is empty, the
                 "Book a Session" button scrolls to the contact form instead.
       phone:    the number people should call, e.g. "+1 555 123 4567" (opens as a tel: link).
       email:    (above) becomes the "Email Helan" mailto: link. */
    whatsapp: "",
    phone: "+14699118086",
    whatsappMessage: "Hi Helan, I would like to enquire about a photography session.",
    ctaLabels: {
      book: "Book a Session",
      whatsapp: "WhatsApp Helan",
      phone: "Call Helan",
      email: "Email Helan"
    },
    interestLabel: "Photography interest",
    interestPlaceholder: "Choose one (optional)",
    interestOptions: ["Wedding", "Food", "Anniversaries", "Nature", "Kids"],
    submitLabel: "Send Message",
    sendingLabel: "Sending\u2026",
    successMessage: "Thanks for reaching out. Your message has been sent.",
    errorMessage: "Your message could not be sent right now. Please try again, or contact us directly by email.",
    notConfiguredMessage: "This form is not connected to an email address yet, so your message was not sent. Please check back soon."
  },

  /* ---------- Email delivery (FormSubmit, works on static hosting) ----------
     recipient: your email address OR the private code FormSubmit gives you after
     activation (the code keeps your address out of the page source).
     Leave "" until you have followed the README's "Contact form" steps.
     The form will honestly say it is not connected until this is filled in. */
  form: {
    provider: "formsubmit",
    recipient: "",
    subject: "New enquiry from the Helan Event Photography website"
  },

  /* ---------- Social links ----------
     Add real URLs only. Empty ones are not shown. */
  social: {
    instagram: "https://www.instagram.com/helanphotography/",
    facebook: "",
    tiktok: "https://www.tiktok.com/@helaneventphotography"
  },

  /* ---------- Footer ---------- */
  footer: {
    inviteEyebrow: "HAVE A PROJECT IN MIND?",
    inviteHeading: "Let\u2019s create something meaningful.",
    inviteCopy: "For weddings, celebrations, family portraits, and life\u2019s special moments.",
    inviteCta: "Get in Touch \u2197",
    inviteLinkLabel: "View the Portfolio \u2197",
    statement: "Photography for the moments worth remembering.",
    copyright: "\u00A9 {year} Helan Event Photography. All rights reserved.",
    year: null                                  // null = current year automatically; or type a number, e.g. 2026
  },

  /* ==========================================================================
     PHOTOS
     One entry per photograph. To add a photo: copy the file into the right
     Photos/<Category>/ folder, then copy one entry below and change it.
       id            unique, no spaces
       src           path to the full-size image (relative to this file)
       thumb         optional smaller copy for grids (omit it to use src)
       w, h, tw      optional pixel sizes (full width, full height, thumb width);
                     they stop the page jumping while images load
       category      must be one of the category ids above
       alt           a plain description of what is visible (for screen readers)
       title/caption optional short text shown in the full-screen viewer
       featured      true = appears in "Selected work" on the home page
       featuredOrder optional number to order the featured photos
       display       false = hide the photo everywhere (kept in the file)
       order         lower numbers appear first inside a category
     ========================================================================== */
  photos: [
    {
      id: "wedding-henna-circle",
      src: "Photos/Wedding/henna-circle.jpg",
      thumb: "Photos/Wedding/thumbs/henna-circle.webp",
      w: 1052, h: 1402, tw: 1000,
      category: "Wedding",
      alt: "Overhead view of hands decorated with henna, gathered in a circle around a tray of flowers and petals.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 1
    },
    {
      id: "wedding-festive-dress-detail",
      src: "Photos/Wedding/festive-dress-detail.jpg",
      thumb: "Photos/Wedding/thumbs/festive-dress-detail.webp",
      w: 1118, h: 1490, tw: 1000,
      category: "Wedding",
      alt: "Close view of a traditional embroidered festive dress with gold detailing and coin ornaments, and a hand wearing a large ring.",
      title: "",
      caption: "",
      featured: true,
      featuredOrder: 1,
      display: true,
      order: 2
    },
    {
      id: "wedding-camera-screen-couple",
      src: "Photos/Wedding/camera-screen-couple.jpg",
      thumb: "Photos/Wedding/thumbs/camera-screen-couple.webp",
      w: 1184, h: 1568, tw: 1000,
      category: "Wedding",
      alt: "A camera's screen showing a bride in a white dress holding a bouquet, with her partner beside her.",
      title: "",
      caption: "",
      featured: true,
      featuredOrder: 3,
      display: true,
      order: 3
    },
    {
      id: "wedding-beach-proposal",
      src: "Photos/Wedding/beach-proposal.jpg",
      thumb: "Photos/Wedding/thumbs/beach-proposal.webp",
      w: 1536, h: 2048, tw: 1000,
      category: "Wedding",
      alt: "A proposal on the beach at sunset, with a couple kneeling among candles and white roses and a close view of the ring below.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 4
    },
    {
      id: "wedding-keepsake-jars-tray",
      src: "Photos/Wedding/keepsake-jars-tray.jpg",
      thumb: "Photos/Wedding/thumbs/keepsake-jars-tray.webp",
      w: 1107, h: 1476, tw: 1000,
      category: "Wedding",
      alt: "Gold trays holding red-lidded keepsake jars and sweets on an embroidered tablecloth.",
      title: "",
      caption: "",
      featured: true,
      featuredOrder: 5,
      display: true,
      order: 5
    },
    {
      id: "wedding-ring-box-monochrome",
      src: "Photos/Wedding/ring-box-monochrome.jpg",
      thumb: "Photos/Wedding/thumbs/ring-box-monochrome.webp",
      w: 1516, h: 2021, tw: 1000,
      category: "Wedding",
      alt: "Black-and-white photograph of a hand holding open a ring box in front of a partner.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 6
    },
    {
      id: "kids-siblings-kiss",
      src: "Photos/Kids/siblings-kiss.jpg",
      thumb: "Photos/Kids/thumbs/siblings-kiss.webp",
      w: 1536, h: 2048, tw: 1000,
      category: "Kids",
      alt: "A young boy in a cap leaning in to kiss a baby on the forehead.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 1
    },
    {
      id: "kids-baby-with-teddy",
      src: "Photos/Kids/baby-with-teddy.jpg",
      thumb: "Photos/Kids/thumbs/baby-with-teddy.webp",
      w: 1536, h: 2048, tw: 1000,
      category: "Kids",
      alt: "A baby wearing a small crown looking at a plush teddy bear.",
      title: "",
      caption: "",
      featured: true,
      featuredOrder: 6,
      display: true,
      order: 2
    },
    {
      id: "kids-booties-and-dance",
      src: "Photos/Kids/booties-and-dance.jpg",
      thumb: "Photos/Kids/thumbs/booties-and-dance.webp",
      w: 1118, h: 1358, tw: 1000,
      category: "Kids",
      alt: "White knitted baby booties in the grass, with a blurred couple dancing among trees behind them.",
      title: "",
      caption: "",
      featured: true,
      featuredOrder: 2,
      display: true,
      order: 3
    },
    {
      id: "kids-gender-reveal-smoke",
      src: "Photos/Kids/gender-reveal-smoke.jpg",
      thumb: "Photos/Kids/thumbs/gender-reveal-smoke.webp",
      w: 1340, h: 1596, tw: 1000,
      category: "Kids",
      alt: "A couple behind a lit BABY letter display as pink smoke rises, with white balloons and sparklers on a lawn.",
      title: "",
      caption: "",
      featured: true,
      featuredOrder: 7,
      display: true,
      order: 4
    },
    {
      id: "kids-maternity-woodland",
      src: "Photos/Kids/maternity-woodland.jpg",
      thumb: "Photos/Kids/thumbs/maternity-woodland.webp",
      w: 1179, h: 1160, tw: 1000,
      category: "Kids",
      alt: "A pregnant woman in a rust-coloured dress with her hand on her belly, beside a woodland stream.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 5
    },
    {
      id: "kids-ultrasound-booties",
      src: "Photos/Kids/ultrasound-booties.jpg",
      thumb: "Photos/Kids/thumbs/ultrasound-booties.webp",
      w: 1134, h: 1378, tw: 1000,
      category: "Kids",
      alt: "Two ultrasound printouts beside a pair of white knitted baby booties.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 6
    },
    {
      id: "kids-blue-socks-ultrasound",
      src: "Photos/Kids/blue-socks-ultrasound.jpg",
      thumb: "Photos/Kids/thumbs/blue-socks-ultrasound.webp",
      w: 736, h: 981, tw: 736,
      category: "Kids",
      alt: "Ultrasound images and small blue knitted socks on a textured white blanket.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 7
    },
    {
      id: "kids-boy-balloons-grass",
      src: "Photos/Kids/boy-balloons-grass.jpg",
      thumb: "Photos/Kids/thumbs/boy-balloons-grass.webp",
      w: 736, h: 981, tw: 736,
      category: "Kids",
      alt: "A blue BOY foil balloon, light blue balloons and an ultrasound print arranged on grass.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 8
    },
    {
      id: "kids-mother-and-toddler",
      src: "Photos/Kids/mother-and-toddler.jpg",
      thumb: "Photos/Kids/thumbs/mother-and-toddler.webp",
      w: 3193, h: 3193, tw: 1000,
      category: "Kids",
      alt: "A smiling woman holding a toddler in a bright room.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 9
    },
    {
      id: "kids-mothers-day-backdrop",
      src: "Photos/Kids/mothers-day-backdrop.jpg",
      thumb: "Photos/Kids/thumbs/mothers-day-backdrop.webp",
      w: 2666, h: 2666, tw: 1000,
      category: "Kids",
      alt: "Two women each holding a young child in front of a green and pink Happy Mother's Day balloon backdrop.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 10
    },
    {
      id: "kids-matching-green-tops",
      src: "Photos/Kids/matching-green-tops.jpg",
      thumb: "Photos/Kids/thumbs/matching-green-tops.webp",
      w: 2666, h: 2666, tw: 1000,
      category: "Kids",
      alt: "Two women in matching sage-green tops smiling in front of a Mother's Day balloon backdrop.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 11
    },
    {
      id: "kids-smiles-balloon-arch",
      src: "Photos/Kids/smiles-balloon-arch.jpg",
      thumb: "Photos/Kids/thumbs/smiles-balloon-arch.webp",
      w: 2666, h: 2666, tw: 1000,
      category: "Kids",
      alt: "Two women smiling together in front of a pastel balloon arch.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 12
    },
    {
      id: "nature-lake-dock-sunset",
      src: "Photos/Nature/lake-dock-sunset.jpg",
      thumb: "Photos/Nature/thumbs/lake-dock-sunset.webp",
      w: 1541, h: 2055, tw: 1000,
      category: "Nature",
      alt: "Sunset reflected on a calm lake beside a wooden dock.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 1
    },
    {
      id: "nature-golden-hour-trees",
      src: "Photos/Nature/golden-hour-trees.jpg",
      thumb: "Photos/Nature/thumbs/golden-hour-trees.webp",
      w: 1539, h: 2052, tw: 1000,
      category: "Nature",
      alt: "Golden sun low over a lake, framed by dark silhouetted trees.",
      title: "",
      caption: "",
      featured: true,
      featuredOrder: 4,
      display: true,
      order: 2
    },
    {
      id: "nature-field-sunset-rays",
      src: "Photos/Nature/field-sunset-rays.jpg",
      thumb: "Photos/Nature/thumbs/field-sunset-rays.webp",
      w: 3072, h: 4096, tw: 1000,
      category: "Nature",
      alt: "Orange sunset with soft rays above an open field and a distant tree line.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 3
    },
    {
      id: "nature-sunbeams-through-clouds",
      src: "Photos/Nature/sunbeams-through-clouds.jpg",
      thumb: "Photos/Nature/thumbs/sunbeams-through-clouds.webp",
      w: 1440, h: 1920, tw: 1000,
      category: "Nature",
      alt: "Sunbeams breaking through layered clouds at sunset above a street lamp.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 4
    },
    {
      id: "nature-sunset-car-mirror",
      src: "Photos/Nature/sunset-car-mirror.jpg",
      thumb: "Photos/Nature/thumbs/sunset-car-mirror.webp",
      w: 1381, h: 1842, tw: 1000,
      category: "Nature",
      alt: "An orange sunset over a road, reflected in a car's side mirror.",
      title: "",
      caption: "",
      featured: false,
      display: true,
      order: 5
    }
  ]
};
