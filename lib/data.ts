// TODO: replace with production domain + real LinkedIn URL.
export const siteUrl = "https://example.com";

export const profile = {
  name: "Aniket Sarbha",
  role: "Full Stack Developer",
  location: "Delhi, India",
  email: "sarbhaaniket@gmail.com",
  phone: "7678573085",
  github: "https://github.com/Aniket-sarbha",
  linkedin: "https://linkedin.com",
  resume: "/resume.pdf",
  available: true,
};

export const marqueeTech = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Prisma",
  "PostgreSQL",
  "Convex",
  "Docker",
  "Framer Motion",
  "Shadcn",
  "Gemini API",
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  stack: string[];
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Doozer Studios",
    role: "Full Stack Developer",
    period: "Apr 2025 — Present",
    stack: ["React", "Tailwind CSS", "Supabase", "Vite", "Shadcn"],
    points: [
      "QR code platform for pet owners, shelters, and brands — tags with GPS tracking, scan analytics, and recovery workflows.",
      "QR-to-onboarding flow for public pet profiles with contacts, photos, and GPS; Supabase Auth, Storage, and RBAC.",
      "Responsive UI with React, TypeScript, Vite, Tailwind, Shadcn, and Radix, plus an admin dashboard for bulk tag generation and PDF exports.",
    ],
  },
  {
    company: "Green Dharma Lifestyles",
    role: "Full Stack Developer Intern",
    period: "Feb 2025 — Apr 2025",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Docker", "NextAuth.js"],
    points: [
      "Gaming e-commerce platform serving a large catalog across many storefronts, built with optimized SSR.",
      "Digital fulfillment through automated REST API workflows with multi-currency support.",
      "Role-based access for user accounts with NextAuth.js.",
    ],
  },
];

export type Artifact = "file-stack" | "approval-queue" | "tag-grid" | "storefront-shelf";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  accent?: string;
  tagline: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  year: string;
  colorway: "ivory" | "plum";
  artifact: Artifact;
  images: ProjectImage[];
  overview: string;
  built: string[];
  outcomes: string[];
};

export const projects: Project[] = [
  {
    slug: "file-drive",
    title: "File Drive",
    tagline: "SaaS file manager with AI summarization",
    stack: ["Next.js", "Convex", "Clerk", "Gemini"],
    liveUrl: "https://file-drive-coral.vercel.app/",
    repoUrl: "https://github.com/Aniket-sarbha/File-drive",
    year: "2024",
    colorway: "ivory",
    artifact: "file-stack",
    images: [
      {
        src: "/file-drive/file-drive-dashboard.png",
        alt: "File Drive dashboard showing file cards and the context menu with Summarize with Gemini and Convert to DOCX actions",
      },
      {
        src: "/file-drive/file-drive-landing.png",
        alt: "File Drive landing page with headline and Get started call to action",
      },
    ],
    overview:
      "Teams shared files over chat threads and Drive links — slow to find, risky to permission. File Drive gives organizations one searchable home for uploads with secure role-based access.",
    built: [
      "Drag-and-drop uploads with large-file support on a type-safe Convex backend",
      "Google Gemini summarization with a PDF to DOCX conversion pipeline",
      "Clerk RBAC with per-org roles and graceful error handling",
    ],
    outcomes: [],
  },
  {
    slug: "learning-exchange",
    title: "Learning Exchange",
    tagline: "Knowledge-sharing platform with RBAC",
    stack: ["Next.js", "Supabase", "Framer Motion", "TypeScript"],
    liveUrl: "https://fortificationlearninghub.org/",
    year: "2024",
    colorway: "plum",
    artifact: "approval-queue",
    images: [
      {
        src: "/learning-exchange/learning-library.png",
        alt: "Learning Exchange resource library with region filters and publication cards",
      },
      {
        src: "/learning-exchange/learning-hero.png",
        alt: "Learning Exchange homepage hero about shared knowledge in food fortification",
      },
      {
        src: "/learning-exchange/learning-register.png",
        alt: "Learning Exchange registration page with account creation form",
      },
    ],
    overview:
      "A community's knowledge lived in scattered docs and chats. The Learning Exchange centralizes the Knowledge Hub, Resources, News & Events, and Webinars behind governed publishing that non-technical editors control.",
    built: [
      "Super Admin, Admin, and User RBAC with content approval workflows",
      "Centralized dashboard for routes, users, contact submissions, and the moderation queue",
      "Supabase realtime database, auth, and cloud storage throughout",
    ],
    outcomes: [],
  },
  {
    slug: "margaux-pets",
    title: "Margaux Pets Shop",
    tagline: "Smart QR tags for every pet",
    stack: ["React", "Supabase", "Vite", "Shadcn"],
    year: "2025",
    colorway: "ivory",
    artifact: "tag-grid",
    images: [
      {
        src: "/qr-pet/qr-landing.png",
        alt: "Margaux Pets Shop landing page with Smart QR Tags hero over a dog photograph",
      },
      {
        src: "/qr-pet/qr-auth.png",
        alt: "Margaux Pets Shop sign in page with community message",
      },
    ],
    overview:
      "Lost pets meant paper flyers and dead ends. Built at Doozer Studios, this platform turns a tag scan into a reunion: public pet profiles with contacts, photos, and GPS for owners, shelters, and brands.",
    built: [
      "QR-to-onboarding flow from scan to public profile with contacts, photos, and GPS",
      "Scan analytics with recovery workflows across managed tags",
      "Admin dashboard for bulk tag generation and PDF exports",
    ],
    outcomes: [],
  },
  {
    slug: "yokcash",
    title: "Yokcash",
    accent: "currency",
    tagline: "Discounted game currency for every gamer",
    stack: ["Next.js", "Prisma", "PostgreSQL", "NextAuth.js"],
    repoUrl: "https://github.com/Aniket-sarbha/game-ecommerce",
    year: "2025",
    colorway: "plum",
    artifact: "storefront-shelf",
    images: [
      {
        src: "/yokcash/yokcash-carousel.png",
        alt: "Yokcash featured game carousel showing Honkai Star Rail with ratings and player stats",
      },
      {
        src: "/yokcash/yokcash-hero.png",
        alt: "Yokcash homepage hero with discounted game currency headline",
      },
      {
        src: "/yokcash/yokcash-stores.png",
        alt: "Yokcash browse-all-stores page with search and sort controls",
      },
    ],
    overview:
      "A gaming catalog spread across storefronts was slow to browse and manual to fulfill. Built at Green Dharma Lifestyles, the platform pairs optimized SSR storefronts with automated order APIs.",
    built: [
      "Optimized SSR storefronts with search, sort, and featured-game carousels",
      "Automated REST fulfillment workflows with multi-currency support",
      "NextAuth role-based access for user accounts",
    ],
    outcomes: [],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React.js", "React Native", "Expo", "Next.js", "Tailwind CSS", "Vite", "Radix UI", "Shadcn", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "Express.js", "Prisma ORM", "REST APIs", "Convex", "Supabase"] },
  { group: "Databases", items: ["PostgreSQL", "MongoDB", "SQL"] },
  { group: "Cloud", items: ["AWS EC2", "Vercel", "Netlify", "Coolify", "Dokploy", "Hostinger", "Nginx"] },
  { group: "Tools", items: ["Git", "GitHub", "Docker", "Postman", "n8n", "VS Code", "Cursor"] },
];

export const education = {
  school: "Bhagwan Parshuram Institute of Technology",
  location: "Rohini, Delhi",
  period: "2021 — 2025",
  degree: "Electronics and Communication Engineering",
};

export const volunteering = [
  { org: "FXB India Suraksha (NGO)", detail: "Weekly classes for students in Noida" },
  { org: "Desh Ke Mentor", detail: "Career counselling, Delhi Govt. Schools" },
];

export const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
