"use client";

import React, { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import Header from "../../components/Header";

// Crisp Inline SVG Logo Component for Footer
function Logo({ className = "", light = false }) {
  return (
    <img
      src="/logo.png"
      alt="Ananya Hi Solutions"
      className={`nav-logo-img ${className}`}
      style={{
        height: "42px",
        width: "auto",
        objectFit: "contain",
        display: "block"
      }}
    />
  );
}



// Render dynamic paragraph with hyperlink for first paragraph (Format matching Image 3 Link)
function renderParagraph(text, index, serviceId) {
  if (index !== 0) return <p key={index}>{text}</p>;
  
  let htmlContent = text;
  switch (serviceId) {
    case "web-design":
      htmlContent = text.replace("website", `<a href="/services/web-design" style="color: var(--primary-blue); text-decoration: underline; font-weight: 600;">website</a>`);
      break;
    case "digital-marketing":
      htmlContent = text.replace("digital marketing", `<a href="/services/digital-marketing" style="color: var(--primary-blue); text-decoration: underline; font-weight: 600;">digital marketing</a>`);
      break;
    case "mobile-app":
      htmlContent = text.replace("mobile applications", `<a href="/services/mobile-app" style="color: var(--primary-blue); text-decoration: underline; font-weight: 600;">mobile applications</a>`);
      break;
    case "ecommerce-app":
      htmlContent = text.replace("eCommerce", `<a href="/services/ecommerce-app" style="color: var(--primary-blue); text-decoration: underline; font-weight: 600;">eCommerce</a>`);
      break;
    case "video-production":
      htmlContent = text.replace("video production", `<a href="/services/video-production" style="color: var(--primary-blue); text-decoration: underline; font-weight: 600;">video production</a>`);
      break;
    case "software-development":
      htmlContent = text.replace("software", `<a href="/services/software-development" style="color: var(--primary-blue); text-decoration: underline; font-weight: 600;">software</a>`);
      break;
    case "aeo":
      htmlContent = text.replace("Answer Engine Optimization", `<a href="/services/aeo" style="color: var(--primary-blue); text-decoration: underline; font-weight: 600;">Answer Engine Optimization</a>`);
      break;
    case "geo":
      htmlContent = text.replace("Google Engine Optimization", `<a href="/services/geo" style="color: var(--primary-blue); text-decoration: underline; font-weight: 600;">Google Engine Optimization</a>`);
      break;
    case "youtube-seo":
      htmlContent = text.replace("YouTube SEO", `<a href="/services/youtube-seo" style="color: var(--primary-blue); text-decoration: underline; font-weight: 600;">YouTube SEO</a>`);
      break;
    case "youtube-ads":
      htmlContent = text.replace("YouTube Ads", `<a href="/services/youtube-ads" style="color: var(--primary-blue); text-decoration: underline; font-weight: 600;">YouTube Ads</a>`);
      break;
    default:
      break;
  }
  
  return <p key={index} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

// Rich services configuration matching exact specifications and Unsplash stock visual backgrounds
const SERVICES_DETAIL_DATA = {
  "web-design": {
    title: "Website Design",
    bannerTitle: "Website Design Company in Hyderabad",
    bannerDesc: "Ananya Hi Solutions is your trusted partner for affordable, SEO-friendly & mobile-optimized website design in Hyderabad. We create websites that not only look stunning but also bring you more traffic, leads & sales.",
    bannerBadge: "✓ 100+ Websites Delivered in Hyderabad | ⭐️ Rated 5/5 by Local Businesses",
    heroVisual: "/images/hero/web-design.png",
    subtypesTitle: "Website Development Agency in Hyderabad for Startups & Brands",
    subtypesDesc: "Get SEO-friendly static, dynamic, and e-commerce websites that drive traffic, leads & sales. Trusted by startups & brands in Hyderabad.",
    row1Image: "/images/web-design-overview.png",
    row2Image: "/images/web-design-capabilities.png",
    types: [
      { 
        id: "static", 
        title: "Static Website Design", 
        bgImage: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=800&q=80",
        desc: "Perfect for startups & small businesses. Fast loading, fully responsive, and SEO-friendly landing pages." 
      },
      { 
        id: "dynamic", 
        title: "Dynamic Website Design", 
        bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        desc: "Custom content management systems (CMS), corporate portals, and interactive, database-driven sites." 
      },
      { 
        id: "ecommerce", 
        title: "E-commerce Website Design", 
        bgImage: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
        desc: "Full-scale online stores featuring advanced shopping pipelines, secure payments, and inventory dashboards." 
      }
    ],
    overviewTitle: "Professional Website Design and Development Services in Hyderabad",
    paragraphs: [
      "In today's digital-first world, your website is often the first impression potential customers have of your business. At Ananya Hi Solutions, we create stunning, high-performance websites that not only look exceptional but drive real business results.",
      "Our website design and development services combine aesthetic excellence with technical sophistication. Every website we build is fully responsive (mobile, tablet, desktop), optimized for search engines, designed for fast loading speeds, and focused on user experience and conversion optimization.",
      "We specialize in diverse web solutions including corporate websites, e-commerce platforms, portfolio sites, landing pages, web applications, CMS-based sites (WordPress, Shopify), and custom PHP/React development. Whether you need a simple brochure site or a complex web application, we have the expertise to deliver."
    ],
    faqs: [
      { q: "What technologies does Ananya Hi Solutions use for website development?", a: "We leverage modern technology stacks including React, Next.js, HTML5/CSS3, Node.js, and popular content management systems (WordPress, Shopify, custom headless CMS) to build secure, robust, and lightning-fast websites tailored to your business." },
      { q: "How much does website design and development cost at Ananya Hi Solutions?", a: "The cost depends on the scope, features, and complexity of the project. We offer customized packages ranging from basic static websites for startups to advanced e-commerce platforms and custom web applications. Contact us for a free detailed quote." },
      { q: "What is included in your website design package?", a: "Our standard packages include custom UI/UX design, fully responsive layout, basic SEO optimization, contact form integration, social media linkage, and post-launch technical support." },
      { q: "How do you ensure websites are mobile-friendly and responsive?", a: "We follow a mobile-first design philosophy. Every website is built using fluid layouts and tested across multiple physical devices and screen sizes to ensure a flawless user experience on mobile, tablet, and desktop." },
      { q: "What ongoing support do you provide after website launch?", a: "We provide comprehensive post-launch support, including regular software updates, security monitoring, database backups, content updates, and troubleshooting to keep your website running smoothly 24/7." }
    ]
  },
  "digital-marketing": {
    title: "Digital Marketing",
    bannerTitle: "Digital Marketing Agency in Hyderabad",
    bannerDesc: "Ananya Hi Solutions is a top-rated digital marketing company in Hyderabad. We build data-driven organic search campaigns, paid ad pipelines, and viral social campaigns designed to multiply your sales and ROI.",
    bannerBadge: "✓ 50+ Growth Campaigns Managed | ⭐️ Rated 4.9/5 by Brand Managers",
    heroVisual: "/images/hero/digital-marketing.png",
    subtypesTitle: "Digital Marketing Services in Hyderabad for Startups & Brands",
    subtypesDesc: "Drive high-intent traffic, build active communities, and generate consistent leads with targeted digital campaigns.",
    row1Image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    row2Image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    types: [
      { 
        id: "seo", 
        title: "SEO", 
        bgImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
        desc: "Rank at the top of organic search engine results for high-intent buyer keywords to drive consistent leads." 
      },
      { 
        id: "smm", 
        title: "Social Media Marketing", 
        bgImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
        desc: "Cultivate high-engagement follower bases across Instagram, LinkedIn, Facebook, and Twitter." 
      },
      { 
        id: "google-ads", 
        title: "Google Ads", 
        bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        desc: "Target immediate prospective buyers with high-converting search, shopping, and display ad setups." 
      },
      { 
        id: "content-marketing", 
        title: "Content Marketing", 
        bgImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
        desc: "Position your brand as an industry authority with search-optimized copy, blogs, and creative infographics." 
      },
      { 
        id: "email-marketing", 
        title: "Email Marketing", 
        bgImage: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80",
        desc: "Automate nurturing workflows, re-engage leads, and keep customers loyal with newsletters." 
      }
    ],
    overviewTitle: "Professional Digital Marketing Services in Hyderabad",
    paragraphs: [
      "Online visibility is the single most critical factor for modern business growth. At Ananya Hi Solutions, we implement comprehensive digital marketing campaigns designed to position your brand at the forefront of your industry.",
      "We combine technical search audits, high-intent keyword strategies, creative social copywriting, and conversion-optimized ad placements to deliver predictable customer acquisitions.",
      "Whether you are looking to boost your local foot traffic in Hyderabad, rank organically globally, or launch paid funnels on Meta and Google, our certified marketing team executes campaigns with transparent monthly reporting."
    ],
    faqs: [
      { q: "How long does it take to see results from SEO campaigns?", a: "SEO is a medium-to-long-term strategy. While initial technical fixes improve search crawls quickly, significant ranking shifts and organic traffic growth typically take 3 to 6 months of consistent optimization." },
      { q: "What budget do I need for Google and Meta PPC campaigns?", a: "We design campaigns tailored to your specific budget. You can start with a modest daily ad spend and scale up once we optimize the campaign for positive return-on-ad-spend (ROAS)." },
      { q: "Do you provide monthly reports and conversion tracking?", a: "Yes. We configure full-funnel tracking using Google Analytics 4 and provide comprehensive monthly reports outlining clicks, impressions, costs, and generated leads." },
      { q: "How do you select keywords for our industry?", a: "We analyze competitor keyword rankings, search volume trends, buyer search intent, and historical data to select the most profitable target phrases for your campaign." },
      { q: "What social media platforms should my business focus on?", a: "This depends on your target demographic. B2B brands typically see the highest returns on LinkedIn and Twitter, while retail or lifestyle brands excel on Instagram, Facebook, and YouTube." }
    ]
  },
  "mobile-app": {
    title: "Mobile Application",
    bannerTitle: "Mobile App Development Company in Hyderabad",
    bannerDesc: "Ananya Hi Solutions engineers elite mobile applications for iOS and Android platforms. We design fluid, high-performance apps that drive user engagement and scale your services.",
    bannerBadge: "✓ 30+ Custom Apps Launched | ⭐️ Rated 5/5 by Product Owners",
    heroVisual: "/images/hero/mobile-app.png",
    subtypesTitle: "Mobile App Development Services in Hyderabad",
    subtypesDesc: "Deploy high-performance Swift, Kotlin, or cross-platform mobile applications tailored to your business specifications.",
    row1Image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
    row2Image: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&w=800&q=80",
    types: [
      { 
        id: "ios", 
        title: "iOS Development", 
        bgImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        desc: "Native iOS app designs leveraging Swift and SwiftUI for buttery-smooth performances on Apple devices." 
      },
      { 
        id: "android", 
        title: "Android App Development", 
        bgImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
        desc: "Custom Kotlin-based Android apps designed for reliability, speed, and maximum device compatibility." 
      }
    ],
    overviewTitle: "Professional Mobile App Development in Hyderabad",
    paragraphs: [
      "Mobile apps have become the primary touchpoint for customer interaction. We craft responsive, secure, and feature-rich applications that keep your brand inside your customers' pockets.",
      "Our engineering process covers full-cycle design: initial UI wireframing, fluid frontend coding, robust API integrations, real-time database management, and store deployment.",
      "We build native apps using Kotlin and Swift to extract maximum hardware performance, as well as cross-platform frameworks (Flutter/React Native) for faster market delivery."
    ],
    faqs: [
      { q: "What is the difference between native and cross-platform apps?", a: "Native apps are built specifically for one operating system (Swift for iOS, Kotlin for Android), offering maximum performance. Cross-platform apps use a single codebase (like Flutter) to run on both platforms, saving development time and costs." },
      { q: "How long does it take to develop a custom mobile application?", a: "A standard mobile app takes 8 to 12 weeks to design, develop, test, and publish. More complex enterprise applications with real-time syncs or custom APIs may take longer." },
      { q: "Do you handle App Store and Google Play Store submissions?", a: "Yes. We manage the entire deployment process, ensuring your application complies with Apple and Google design guidelines and security policies." },
      { q: "Can your mobile apps work offline?", a: "Yes. We can integrate local offline databases (like SQLite or CoreData) so users can access core features without an active internet connection, syncing data once reconnected." },
      { q: "How do you secure user data in your mobile apps?", a: "We implement advanced encryption protocols, secure token-based authentication (JWT), and encrypted SSL communication to protect all user transactions and personal information." }
    ]
  },
  "ecommerce-app": {
    title: "Ecommerce Application",
    bannerTitle: "Ecommerce Development Company in Hyderabad",
    bannerDesc: "Scale your retail sales with high-converting eCommerce stores. Ananya Hi Solutions builds blazing-fast multi-vendor marketplaces and single-brand storefronts.",
    bannerBadge: "✓ 40+ E-Commerce Platforms Built | ⭐️ Rated 5/5 by Online Retailers",
    heroVisual: "/images/hero/ecommerce-app.png",
    subtypesTitle: "eCommerce Store Development in Hyderabad",
    subtypesDesc: "Deploy highly secure, scalable, and fast shopping pipelines with inventory systems and payment integrations.",
    row1Image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    row2Image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    types: [
      { 
        id: "single-vendor", 
        title: "Single Vendor Store", 
        bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
        desc: "Custom standalone digital storefronts for singular brands looking to scale online retail sales." 
      },
      { 
        id: "multi-vendor", 
        title: "Multi Vendor Marketplace", 
        bgImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
        desc: "Amazon-style split-fee marketplace platforms where multiple independent merchants list products." 
      }
    ],
    overviewTitle: "Professional E-Commerce Development Services in Hyderabad",
    paragraphs: [
      "An online store needs to be fast, secure, and simple to navigate. We engineer conversion-focused eCommerce systems equipped with advanced filter searches, rapid checkout workflows, and dynamic stock tracking.",
      "We build single-brand stores to highlight your brand's unique identity, as well as complex multi-vendor marketplaces allowing sellers to register, set up storefronts, and manage inventory easily.",
      "Every system is integrated with robust payment gateways (Razorpay, Stripe, Paytm), courier tracking APIs, automated invoice generators, and comprehensive admin dashboard panels."
    ],
    faqs: [
      { q: "What e-commerce platforms do you specialize in?", a: "We develop custom e-commerce applications using Next.js and Node.js for high-performance needs, as well as platforms like Shopify, WooCommerce, and Magento for rapid deployments." },
      { q: "Is there a limit to the number of products my online store can hold?", a: "No. Our database architectures are designed to support unlimited products, categories, and attributes without impacting loading speeds." },
      { q: "How do we manage shipping and courier tracking?", a: "We integrate logistics APIs (like Shiprocket, Delhivery, or FedEx) to automatically calculate shipping costs, print labels, and send live tracking codes to customers." },
      { q: "Can I accept international credit cards and payments?", a: "Yes. We configure multi-currency support and link international payment gateways like Stripe or PayPal to accept payments worldwide." },
      { q: "How do you optimize checkout to reduce cart abandonment?", a: "We design clean, single-page checkouts with auto-fill fields, multiple payment options (UPI, Cards, NetBanking, COD), and automated cart abandonment email reminders." }
    ]
  },
  "video-production": {
    title: "Video Production",
    bannerTitle: "Video Production Company in Hyderabad",
    bannerDesc: "Ananya Hi Solutions delivers premium cinematic video production. We script, film, and edit corporate profiles, social media loops, and product explainers that captivate audiences.",
    bannerBadge: "✓ 200+ Videos Produced | ⭐️ Rated 4.9/5 by Corporate Clients",
    heroVisual: "/images/hero/video-production.png",
    subtypesTitle: "Professional Video Production Services in Hyderabad",
    subtypesDesc: "High-definition corporate profiles, marketing promotions, explainers, event highlights, and social loops.",
    row1Image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    row2Image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    types: [
      { 
        id: "corporate", 
        title: "Corporate Video Production", 
        bgImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
        desc: "Cinematic company profiles, executive interviews, culture reels, and professional walkthroughs." 
      },
      { 
        id: "promo", 
        title: "Promotional Marketing Videos", 
        bgImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
        desc: "Hook-oriented visual ad creatives and product campaigns designed to maximize CTR and conversions." 
      },
      { 
        id: "event", 
        title: "Event Coverage & Highlights", 
        bgImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        desc: "Multi-camera setups, stage lighting captures, aerial drone recordings, and rapid highlight cuts." 
      },
      { 
        id: "explainer", 
        title: "Product Explainer Videos", 
        bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        desc: "Custom 2D/3D explainers outlining custom workflows, features, and complex software platforms." 
      },
      { 
        id: "social", 
        title: "Social Media Content", 
        bgImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
        desc: "Engaging vertical reels, interactive TikTok styles, and dynamic loops engineered for algorithm reach." 
      },
      { 
        id: "music-video", 
        title: "Music Video Production", 
        bgImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
        desc: "Cinematic directions, screenplays, multi-point color grading, and dynamic post-production synchronization." 
      },
      { 
        id: "short-films", 
        title: "Short Films & Web Series Production", 
        bgImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
        desc: "Script-to-screen drama, screenplays, professional color mastering, casting, and sound design." 
      }
    ],
    overviewTitle: "Professional Video Production and Storytelling in Hyderabad",
    paragraphs: [
      "Video is the most powerful medium to communicate your brand story. Our production team combines creative scriptwriting, high-definition 4K filming, cinematic lighting, and custom sound design to deliver videos that stick with viewers.",
      "We manage the entire video lifecycle: pre-production storyboards, multi-camera shoots, post-production editing, motion graphics, professional voiceovers, and audio mixing.",
      "Whether you need an elegant corporate documentary, a batch of viral Instagram Reels, or a detailed product explainer animation, our visual content drives deep customer trust."
    ],
    faqs: [
      { q: "What is your video production process?", a: "Our process consists of three main phases: Pre-production (scripting, storyboarding, scheduling), Production (filming, lighting, audio recording), and Post-production (editing, color grading, voiceover, sound effects)." },
      { q: "Do you write scripts and provide professional voiceover artists?", a: "Yes. We have dedicated copywriters who draft compelling scripts and a network of professional voiceover artists in multiple languages and accents." },
      { q: "Can you film corporate events or offices anywhere in Hyderabad?", a: "Yes. Our production crew travels across Hyderabad and surrounding regions equipped with cinematic cameras, stabilization rigs, and aerial drones." },
      { q: "How long does it take to edit and deliver the final video?", a: "Delivery timelines depend on video length and complexity. Vertical social videos are delivered within 5-7 days, while corporate videos or animations take 2-4 weeks." },
      { q: "In what formats do you deliver the finished videos?", a: "We deliver master copies in high-definition MP4/MOV formats optimized for website hosting, YouTube, social media platforms, or television broadcasts." }
    ]
  },
  "software-development": {
    title: "Software Development",
    bannerTitle: "Software Development Company in Hyderabad",
    bannerDesc: "Ananya Hi Solutions develops robust enterprise-grade software. We build custom CRMs, Billing engines, LMS portals, and College management systems to automate your workflows.",
    bannerBadge: "✓ 60+ Custom Software Builds | ⭐️ Rated 5/5 by Operations Directors",
    heroVisual: "/images/hero/software-development.png",
    subtypesTitle: "Enterprise Software Development in Hyderabad",
    subtypesDesc: "Custom business tools, educational dashboards, billing structures, and operations systems built to scale.",
    row1Image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
    row2Image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
    types: [
      { 
        id: "crm", 
        title: "CRM Software Development", 
        bgImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
        desc: "Tailored CRM databases to organize sales workflows, store pipeline data, and sync communications." 
      },
      { 
        id: "billing", 
        title: "Billing Software Development", 
        bgImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
        desc: "GST-ready POS invoice portals, multi-point ledger ledgers, and automated payment receipts." 
      },
      { 
        id: "college", 
        title: "College Management System", 
        bgImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        desc: "Comprehensive institution ERPs to connect attendance logs, marks, fees, and students." 
      },
      { 
        id: "lms", 
        title: "Learning Management System", 
        bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        desc: "Scalable e-learning portals featuring interactive quiz components and live course video streams." 
      }
    ],
    overviewTitle: "Custom Software Engineering Services in Hyderabad",
    paragraphs: [
      "Off-the-shelf software rarely fits unique business models. We build secure, customized software architectures designed to solve specific operational bottlenecks and improve team efficiency.",
      "We construct robust CRM customer frameworks, offline-first billing point-of-sale systems, institutional college databases, and high-traffic learning platforms (LMS).",
      "Our systems are built using modern backend frameworks, ensuring smooth data synchronizations, clean APIs, automated cloud backups, and high security protocols."
    ],
    faqs: [
      { q: "What programming languages and frameworks do you use?", a: "We build custom software using Next.js/React, Node.js, Python, PostgreSQL, and secure cloud infrastructures (AWS/Azure) to ensure stability and speed." },
      { q: "Can your custom software integrate with our existing tools?", a: "Yes. We build custom API connectors to link your new software with external tools like WhatsApp, accounting suites, email servers, and payment portals." },
      { q: "Do we own the source code of the custom software?", a: "Yes. Upon project completion and payment settlement, full intellectual property and source code ownership are transferred to you." },
      { q: "What security measures do you implement to protect company databases?", a: "We enforce role-based access control, secure HTTPS/TLS data encryptions, daily automated backups, and protection against common web threats." },
      { q: "Can your billing software work without an active internet connection?", a: "Yes. We build offline-first billing portals that record invoices locally and automatically sync data with cloud servers once internet connection is restored." }
    ]
  },
  "aeo": {
    title: "AEO (Answer Engine)",
    bannerTitle: "Answer Engine Optimization (AEO) in Hyderabad",
    bannerDesc: "Optimize your digital presence for conversational search tools. Ananya Hi Solutions structures your site to rank as a cited reference within ChatGPT, Claude, and Gemini.",
    bannerBadge: "✓ AI-Search Indexing Ready | ⭐️ Rated 5/5 by Tech Startups",
    heroVisual: "/images/hero/aeo.png",
    subtypesTitle: "",
    subtypesDesc: "",
    row1Image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    row2Image: "https://images.unsplash.com/photo-1684369175833-31126786a345?auto=format&fit=crop&w=800&q=80",
    types: [],
    overviewTitle: "Pioneering Answer Engine Optimization",
    paragraphs: [
      "Traditional search behavior is transitioning rapidly from basic links to direct conversational answers. Answer Engine Optimization (AEO) structures and optimizes your content footprint so that conversational AI platforms select your business as the definitive source.",
      "We build advanced schema markups, structure FAQ data networks, and craft direct, query-focused content that aligns perfectly with how large language models (LLMs) parse and retrieve information.",
      "Early adoption of AEO ensures your brand remains visible inside ChatGPT Search, Gemini, and Claude answers, driving compounding organic authority and building trust before a user ever clicks a link."
    ],
    faqs: [
      { q: "What is Answer Engine Optimization (AEO)?", a: "AEO is the practice of optimizing content so AI engines like ChatGPT, Gemini, and Claude can easily read, index, and cite your website as the source when answering user questions." },
      { q: "How do conversational AI search engines find my site?", a: "AI engines crawl structured web indexes, looking for authoritative, highly structured, direct answers. We configure advanced JSON-LD semantic markup to make your content easy for LLMs to reference." },
      { q: "Is AEO suitable for small businesses?", a: "Yes. Early adoption of AI search optimization gives small businesses and startups a massive competitive advantage, enabling them to outrank larger competitors inside AI search responses." }
    ]
  },
  "geo": {
    title: "GEO (Google Engine)",
    bannerTitle: "Google Engine Optimization (GEO) in Hyderabad",
    bannerDesc: "Secure SGE citations. We optimize your website content and structure to occupy AI summary panels and snapshot recommendations in Google SGE.",
    bannerBadge: "✓ Google SGE Citations Strategy | ⭐️ Rated 4.9/5 by Brand Managers",
    heroVisual: "/images/hero/geo.png",
    subtypesTitle: "",
    subtypesDesc: "",
    row1Image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    row2Image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    types: [],
    overviewTitle: "Dominating Google Search Generative Experience",
    paragraphs: [
      "Google's Search Generative Experience (SGE) represents the biggest shift in search engine history. SGE presents AI-synthesized responses at the top of results, citing only a select few websites. GEO is the practice of optimizing your site to be one of those citations.",
      "We restructure your site architecture, improve content authority using semantic SEO techniques, and align pages with Google's SGE indexing algorithms to secure your place in the generative snapshots.",
      "By securing these high-visibility citations, your brand captures high-intent organic users who trust Google's direct recommendations, increasing search CTR and conversions."
    ],
    faqs: [
      { q: "What is GEO and SGE?", a: "SGE is Google's Search Generative Experience, which shows AI-generated answers above search results. GEO (Google Engine Optimization) optimizes your site to get cited inside those SGE boxes." },
      { q: "How does GEO differ from traditional SEO?", a: "GEO focuses on securing citations in Google's AI snapshots, whereas traditional SEO focuses on links ranking in the search index. GEO requires higher semantic density and clear factual declarations." },
      { q: "When will I see results from GEO optimization?", a: "Google SGE crawls and updates its snapshots continuously. Once we deploy structured semantic markup and optimized content, citations can appear within a few weeks." }
    ]
  },
  "youtube-seo": {
    title: "YouTube SEO",
    bannerTitle: "YouTube SEO Company in Hyderabad",
    bannerDesc: "Dominate video recommendation algorithms. We optimize metadata, playlists, descriptions, and closed captions to rank your channel organically.",
    bannerBadge: "✓ YouTube Search Domination | ⭐️ Rated 5/5 by Creators & Brands",
    heroVisual: "/images/hero/youtube-seo.png",
    subtypesTitle: "",
    subtypesDesc: "",
    row1Image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    row2Image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    types: [],
    overviewTitle: "Unlocking Algorithmic Video Reach",
    paragraphs: [
      "YouTube is the second largest search engine globally. To rank organically, your videos must satisfy both user retention metrics and search indexing algorithms. Our YouTube SEO services optimize your videos from script to upload.",
      "We perform high-volume video keyword research, optimize video titles, tags, closed captions, and description schemas, and design visual masterclass thumbnails that maximize click-through rate (CTR).",
      "By aligning your videos with search trends and YouTube's recommendation feed parameters, we build consistent, compounding organic views and channel subscribers."
    ],
    faqs: [
      { q: "Why should my business focus on YouTube SEO?", a: "YouTube search ranks your videos for high-traffic buyer keywords, expanding your brand reach to a visual-first audience and driving long-term passive leads." },
      { q: "What elements do you optimize for YouTube SEO?", a: "We optimize video file names, titles, descriptions, tag fields, timestamps, custom thumbnails, and closed captions (transcripts) to feed clear signals to the algorithm." },
      { q: "Do you also help with thumbnail designs?", a: "Yes. We design custom high-CTR thumbnails and advise on video hooks to maximize user retention, which is a major ranking factor." }
    ]
  },
  "youtube-ads": {
    title: "YouTube Ads",
    bannerTitle: "YouTube Ads Management Agency in Hyderabad",
    bannerDesc: "Build and scale high-ROAS visual video campaigns. We manage scripthooks, precise channel placements, and landing page conversion funnels.",
    bannerBadge: "✓ High-ROI YouTube Ads Setup | ⭐️ Rated 5/5 by E-commerce Brands",
    heroVisual: "/images/hero/youtube-ads.png",
    subtypesTitle: "",
    subtypesDesc: "",
    row1Image: "https://images.unsplash.com/photo-1551836022-8b2858c9c69b?auto=format&fit=crop&w=800&q=80",
    row2Image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    types: [],
    overviewTitle: "High-Performance Video Advertising",
    paragraphs: [
      "Video ads offer unparalleled narrative persuasion. We design, write, target, and monitor custom YouTube ad campaigns (In-Stream, Bumper, Display) that capture buyer interest and multiply ROAS.",
      "We script strong hooks to reduce skips, integrate Google Ads placement parameters, set custom target profiles, and build clean landing page funnels to optimize conversions.",
      "With transparent daily budget tracking, A/B ad creative testing, and weekly performance reviews, we scale video campaigns that drive predictable acquisitions."
    ],
    faqs: [
      { q: "What types of YouTube ads do you run?", a: "We run Skippable In-Stream ads, Non-Skippable ads, 6-second Bumper ads, and In-Feed video ads depending on whether your goal is brand awareness or direct lead conversion." },
      { q: "How do you ensure our ads target the right audience?", a: "We use custom placement targeting (showing ads on specific channels or videos), intent-based keywords, competitor channel targeting, and demographic filtering." },
      { q: "What budget is required for YouTube ads?", a: "We configure campaigns based on your comfortable budget. You can start with a modest daily ad spend and scale up as we optimize for positive return-on-ad-spend (ROAS)." }
    ]
  }
};

export default function ServiceDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const [activeFaq, setActiveFaq] = useState(0);

  // Chat Widget State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hello! Welcome to Ananya Hi Solutions. How can I help you regarding this service today?" },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, chatOpen]);

  // Fallback to web-design if service page ID is invalid
  const data = SERVICES_DETAIL_DATA[id] || SERVICES_DETAIL_DATA["web-design"];

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatMessage("");

    setTimeout(() => {
      let reply = `Thank you for reaching out! Our consultants are ready to assist you with ${data.title}. Drop your email here or write us at info@ananyahisolutions.com.`;
      setChatHistory((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navigation Header */}
      <Header activePage="services" />

      {/* 2. Redesigned Hero Section */}
      <section className="premium-service-hero">
        <div className="hero-glow-blob-1"></div>
        <div className="hero-glow-blob-2"></div>
        <div className="hero-shapes-container">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
        </div>
        <div className="container hero-split-container animate-slide-in">
          {/* Left Column: Text & CTAs */}
          <div className="hero-left-content">
            <h1 className="hero-title">{data.bannerTitle}</h1>
            <p className="hero-subtitle">{data.bannerDesc}</p>
            <div className="hero-actions">
              <a 
                href={`https://wa.me/917673935353?text=Hello%20Ananya%20Hi%20Solutions,%20I%20would%20like%20to%20get%20a%20free%20consultation%20regarding%20your%20${encodeURIComponent(data.title)}%20services.`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-accent hero-cta-btn"
              >
                Get Free Consultation
              </a>
            </div>
          </div>
          
          {/* Right Column: Floating Visual Frame */}
          <div className="hero-right-visual">
            <div className="hero-image-frame">
              <div className="hero-frame-glow"></div>
              <img 
                src={data.heroVisual} 
                alt={`${data.title} Presentation`} 
                className="hero-frame-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sub-services Cards Section */}
      {data.types && data.types.length > 0 && (
        <section className="section subservices-section" style={{ padding: "100px 0", background: "var(--light-gray)" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <div className="section-header">
              <h2>{data.subtypesTitle}</h2>
              <p>{data.subtypesDesc}</p>
            </div>

            <div className="subservices-premium-grid">
              {data.types.map((type) => (
                <div key={type.id} className="premium-subservice-card">
                  <div className="card-bg-image" style={{ backgroundImage: `url(${type.bgImage})` }}></div>
                  <div className="card-overlay"></div>
                  <div className="card-content">
                    <h3 className="card-title">{type.title}</h3>
                    <div className="card-underline"></div>
                    <p className="card-description">{type.desc}</p>
                    <Link href={`/services/${id}/${type.id}`} className="card-cta-btn">
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Alternating Content Section */}
      <section className="alternating-section bg-white" style={{ padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Row 1: Image Left + Content Right */}
          <div className="alternating-row">
            <div className="row-image-container">
              <img src={data.row1Image} alt={`${data.title} Overview`} className="row-image" />
            </div>
            <div className="row-content-container">
              <h2 className="row-heading text-3xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: "var(--font-headings)" }}>
                {data.overviewTitle}
              </h2>
              <div className="row-text text-slate-600 text-base md:text-lg leading-relaxed flex flex-col gap-6" style={{ textAlign: "justify" }}>
                {renderParagraph(data.paragraphs[0], 0, id)}
                {data.paragraphs[1] && <p>{data.paragraphs[1]}</p>}
              </div>
            </div>
          </div>

          {/* Row 2: Content Left + Image Right */}
          {data.paragraphs[2] && (
            <div className="alternating-row row-reverse" style={{ marginTop: "80px" }}>
              <div className="row-image-container">
                <img src={data.row2Image} alt={`${data.title} Capabilities`} className="row-image" />
              </div>
              <div className="row-content-container">
                <h2 className="row-heading text-3xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: "var(--font-headings)" }}>
                  Unlocking Premium Growth & Value
                </h2>
                <div className="row-text text-slate-600 text-base md:text-lg leading-relaxed flex flex-col gap-6" style={{ textAlign: "justify" }}>
                  <p>{data.paragraphs[2]}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. FAQs Accordion Section */}
      <section className="section bg-slate-50/50" style={{ padding: "80px 0", borderTop: "1px solid #f1f5f9" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px" }}>
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Answers to common queries about our {data.title} services</p>
          </div>


          <div className="faq-container" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${idx === activeFaq ? "active" : ""}`}
                style={{
                  background: "#ffffff",
                  border: idx === activeFaq ? "1px solid var(--primary-blue)" : "1px solid #e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "border 0.2s ease"
                }}
              >
                <button
                  className="faq-question"
                  onClick={() => setActiveFaq(idx === activeFaq ? -1 : idx)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "var(--dark-deep)"
                  }}
                >
                  <span>{faq.q}</span>
                  <span 
                    className="faq-toggle-icon" 
                    style={{ 
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.2s ease", 
                      transform: idx === activeFaq ? "rotate(180deg)" : "rotate(0deg)" 
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: idx === activeFaq ? "300px" : "0",
                    transition: "max-height 0.3s ease-out",
                    overflow: "hidden"
                  }}
                >
                  <div className="faq-answer-content" style={{ padding: "0 24px 20px 24px", color: "var(--secondary-slate)", fontSize: "15px", lineHeight: "1.6" }}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Premium Final CTA Section */}
      <section className="premium-final-cta">
        <div className="cta-overlay-glow"></div>
        <div className="container cta-content-wrapper text-center animate-slide-in">
          <h2 className="cta-title">Ready to Elevate Your Digital Authority?</h2>
          <p className="cta-subtitle">
            Get a free consultation and let our digital engineers craft a custom strategy tailored to your business goals.
          </p>
          <a 
            href={`https://wa.me/917673935353?text=Hello%20Ananya%20Hi%20Solutions,%20I%20would%20like%20to%20get%20a%20free%20consultation%20regarding%20your%20${encodeURIComponent(data.title)}%20services.`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-accent cta-glow-btn"
          >
            Get Free Consultation
          </a>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="footer mt-auto">
        <div className="footer-container">
          <div className="footer-brand">
            <Logo light={true} className="footer-logo-svg" />
            <p className="footer-desc mt-4">
              We are a professional Web Design & Digital Marketing agency in Hyderabad, delivering creative solutions that help businesses grow online.
            </p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Payment Terms</Link></li>
              <li><Link href="/blog">News</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li><Link href="/services/web-design">Website Design</Link></li>
              <li><Link href="/services/digital-marketing">Digital Marketing</Link></li>
              <li><Link href="/services/mobile-app">Mobile Application</Link></li>
              <li><Link href="/services/ecommerce-app">Ecommerce Application</Link></li>
              <li><Link href="/services/video-production">Video Production</Link></li>
              <li><Link href="/services/software-development">Software Development</Link></li>
              <li><Link href="/services/aeo">AEO (Answer Engine)</Link></li>
              <li><Link href="/services/geo">GEO (Google Engine)</Link></li>
              <li><Link href="/services/youtube-seo">YouTube SEO</Link></li>
              <li><Link href="/services/youtube-ads">YouTube Ads</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span>401 Sravya Vatika, Greenlands,<br />Begumpet, Hyderabad, Telangana-500016</span>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <span>(+91) 76739-35353</span>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-icon">✉️</span>
                <span>info@ananyahisolutions.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© 2025 Ananya Hi Solutions. All Rights Reserved.</p>
        </div>
      </footer>

      {/* 8. Interactive Chat Widget */}
      <div className="chat-widget-container">
        {!chatOpen && (
          <div className="chat-bubble" onClick={() => setChatOpen(true)}>
            <span>Need Help? 👋</span>
          </div>
        )}

        <div className={`chat-box ${chatOpen ? "open" : ""}`}>
          <div className="chat-header">
            <div className="chat-header-user">
              <div className="chat-header-avatar flex items-center justify-center font-bold text-slate-800 text-[20px]">
                👩‍💻
              </div>
              <div className="chat-header-info">
                <h4>Ananya</h4>
                <p>Online | Digital Assistant</p>
              </div>
            </div>
            <button
              className="chat-header-close"
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`chat-msg ${
                  msg.sender === "bot" ? "chat-msg-received" : "chat-msg-sent"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendChat} className="chat-footer">
            <input
              type="text"
              placeholder="Ask about this service..."
              className="chat-input"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button type="submit" className="chat-send-btn" aria-label="Send message">
              ➤
            </button>
          </form>
        </div>

        <div className="chat-trigger" onClick={() => setChatOpen(!chatOpen)}>
          <div className="w-full h-full flex items-center justify-center text-3xl">
            👩‍💻
          </div>
        </div>
      </div>
    </div>
  );
}
