import {
  Briefcase, Rocket, Megaphone, Users, Server, ShieldCheck, Code2, ShoppingCart, BarChart3,
  type LucideIcon,
} from "lucide-react";

export type ToolDef = {
  code: string;
  name: string;
  description: string;
  price: number; // one-time USD
};

export type Category = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tools: ToolDef[];
};

export const CATEGORIES: Category[] = [
  {
    id: "business-software",
    number: "01",
    title: "Business Software & Productivity",
    description: "Professional SaaS applications for project management, collaboration, documents, and everyday operations.",
    icon: Briefcase,
    tools: [
      { code: "1.1", name: "Project Management Suite", price: 229, description: "Plan, assign, and track projects with tasks, milestones, timelines, and workload views for teams of any size." },
      { code: "1.2", name: "Team Collaboration Workspace", price: 159, description: "Shared workspace for documents, wikis, and team knowledge with granular permissions and version history." },
      { code: "1.3", name: "Document & Contract Manager", price: 249, description: "Centralized document library with e-signature, approval workflows, and full audit trails for business paperwork." },
      { code: "1.4", name: "Time Tracking & Timesheets", price: 199, description: "Track billable hours, approve timesheets, and export reports for payroll or client invoicing." },
      { code: "1.5", name: "Business Calendar & Scheduling", price: 189, description: "Team calendars, meeting scheduling, and availability sharing that syncs with Google, Outlook, and Apple." },
      { code: "1.6", name: "Video Meetings & Conferencing", price: 309, description: "HD video meetings with screen share, recording, transcripts, and calendar integration for distributed teams." },
      { code: "1.7", name: "Business Task Automation", price: 279, description: "No-code workflow builder to automate approvals, notifications, and repetitive business processes across your tools." },
      { code: "1.8", name: "Internal Knowledge Base", price: 169, description: "Company-wide help center for policies, SOPs, and onboarding with search, categories, and role-based access." },
      { code: "1.9", name: "Business File Storage", price: 259, description: "Secure cloud storage with folder permissions, external sharing controls, and enterprise SSO support." },
    ],
  },
  {
    id: "marketing-sales-crm",
    number: "02",
    title: "Marketing, Sales & CRM",
    description: "CRM, email marketing, and sales pipeline software to grow customer relationships and revenue.",
    icon: Megaphone,
    tools: [
      { code: "2.1", name: "Customer Relationship Manager (CRM)", price: 249, description: "Manage contacts, companies, deals, and activities with pipeline views, reminders, and reporting dashboards." },
      { code: "2.2", name: "Email Marketing Platform", price: 209, description: "Design, send, and measure email campaigns with segmentation, templates, and deliverability best practices." },
      { code: "2.3", name: "Sales Pipeline & Deal Tracker", price: 219, description: "Visual deal pipeline with stage automation, forecasting, and win/loss analytics for sales teams." },
      { code: "2.4", name: "Landing Page & Form Builder", price: 189, description: "Drag-and-drop builder for landing pages, lead forms, and thank-you pages with A/B testing." },
      { code: "2.5", name: "Marketing Analytics Dashboard", price: 199, description: "Unified reporting across web, ads, and email with attribution, funnels, and shareable dashboards." },
      { code: "2.6", name: "Contact & Lead Database", price: 179, description: "Central contact database with tags, custom fields, activity history, and CSV/API import-export." },
      { code: "2.7", name: "Quote & Proposal Builder", price: 229, description: "Create branded quotes and proposals with line-item pricing, e-signature, and approval workflows." },
      { code: "2.8", name: "Customer Feedback & Surveys", price: 169, description: "Send NPS, CSAT, and product surveys with response dashboards and integration into your CRM." },
      { code: "2.9", name: "Re-Engagement API Plugin", price: 199, description: "Drop-in API plugin that re-engages inactive customers with automated win-back emails, personalized offers, and lifecycle triggers wired into your CRM and marketing stack." },
    ],
  },
  {
    id: "customer-support-communications",
    number: "03",
    title: "Customer Support & Communications",
    description: "Helpdesk, ticketing, live chat, and business communications software for customer teams.",
    icon: Users,
    tools: [
      { code: "3.1", name: "Helpdesk & Ticketing System", price: 249, description: "Multichannel helpdesk with tickets, SLAs, macros, and reporting for customer support teams." },
      { code: "3.2", name: "Live Chat for Websites", price: 189, description: "Website live chat widget with team routing, canned replies, transcripts, and CRM integration." },
      { code: "3.3", name: "Shared Team Inbox", price: 199, description: "Shared inbox for support@ or sales@ addresses with assignments, internal notes, and collision detection." },
      { code: "3.4", name: "Customer Self-Service Portal", price: 219, description: "Branded help center with searchable articles, categories, and ticket submission for customer self-service." },
      { code: "3.5", name: "Business SMS & Notifications", price: 179, description: "Send transactional and appointment SMS messages with delivery reports and opt-out management." },
      { code: "3.6", name: "Business Email Service", price: 169, description: "Reliable transactional email delivery for receipts, notifications, and password resets with analytics." },
      { code: "3.7", name: "Voice & Business Phone System", price: 229, description: "Cloud phone system with business numbers, IVR menus, call routing, and voicemail transcription." },
    ],
  },
  {
    id: "hosting-cloud-domains",
    number: "04",
    title: "Website Hosting, Cloud & Domains",
    description: "Managed hosting, cloud infrastructure, domain registration, and website management services.",
    icon: Server,
    tools: [
      { code: "4.1", name: "Managed Website Hosting", price: 199, description: "Fast managed hosting with SSD storage, free SSL, daily backups, and one-click staging environments." },
      { code: "4.2", name: "WordPress Managed Hosting", price: 229, description: "Optimized WordPress hosting with automatic updates, caching, and security hardening included." },
      { code: "4.3", name: "Domain Name Registration", price: 39, description: "Register and renew domain names across common TLDs with WHOIS privacy and DNS management." },
      { code: "4.4", name: "Business Email Hosting", price: 89, description: "Professional email at your own domain with calendar, contacts, and mobile client support." },
      { code: "4.5", name: "Cloud VPS Hosting", price: 249, description: "Scalable cloud VPS instances with SSD storage, snapshots, and one-click deployment templates." },
      { code: "4.6", name: "Global CDN & DNS", price: 159, description: "Global CDN and managed DNS for faster page loads, DDoS mitigation, and traffic-based routing." },
      { code: "4.7", name: "SSL Certificates", price: 79, description: "Trusted SSL/TLS certificates with automated issuance, renewal, and installation guides." },
      { code: "4.8", name: "Website Migration Service", price: 149, description: "Guided website migration between hosts with DNS cutover, zero-downtime planning, and QA checks." },
    ],
  },
  {
    id: "ecommerce-web",
    number: "05",
    title: "E-commerce & Website Management",
    description: "Online store platforms, website builders, plugins, and management tools for online businesses.",
    icon: ShoppingCart,
    tools: [
      { code: "5.1", name: "Online Store Builder", price: 289, description: "Launch a professional online store with product catalog, checkout, tax, and shipping configuration." },
      { code: "5.2", name: "Payment Processing Integration", price: 199, description: "Accept payments through leading processors with saved cards, refunds, and reconciliation reports." },
      { code: "5.3", name: "Inventory & Order Management", price: 239, description: "Track inventory across warehouses, manage purchase orders, and fulfill orders from one dashboard." },
      { code: "5.4", name: "Shipping & Fulfillment Manager", price: 189, description: "Compare carrier rates, print labels, and track shipments across multiple sales channels." },
      { code: "5.5", name: "Product Catalog Manager", price: 179, description: "Manage product data, variants, images, and pricing with bulk edit and CSV import/export." },
      { code: "5.6", name: "Website Builder & Themes", price: 219, description: "Drag-and-drop website builder with responsive themes, blog, and built-in SEO controls." },
      { code: "5.7", name: "Business Website Plugins", price: 129, description: "Curated business website plugins for forms, SEO, caching, and analytics with one-click install." },
      { code: "5.8", name: "Customer Loyalty & Rewards", price: 229, description: "Reward repeat customers with points, tiers, and referral programs integrated with your store." },
      { code: "5.9", name: "Abandoned Cart Recovery", price: 169, description: "Automatically recover abandoned checkouts with email reminders, discount rules, and reporting." },
    ],
  },
  {
    id: "security-backup",
    number: "06",
    title: "Security, Backup & Compliance",
    description: "Cybersecurity, backup, monitoring, and compliance software to protect business data and infrastructure.",
    icon: ShieldCheck,
    tools: [
      { code: "6.1", name: "Website Security & Firewall", price: 199, description: "Web application firewall, malware scanning, and virtual patching to protect business websites." },
      { code: "6.2", name: "Automated Website Backups", price: 149, description: "Scheduled off-site backups with one-click restore, retention policies, and integrity checks." },
      { code: "6.3", name: "Uptime & Performance Monitoring", price: 129, description: "Monitor uptime, response times, and SSL expiry with alerts by email, SMS, or webhook." },
      { code: "6.4", name: "Business Password Manager", price: 89, description: "Team password manager with shared vaults, role-based access, and secure credential sharing." },
      { code: "6.5", name: "Single Sign-On (SSO)", price: 289, description: "SAML and OIDC SSO to centralize employee access across your business applications." },
      { code: "6.6", name: "Endpoint Antivirus & EDR", price: 249, description: "Business endpoint protection with antivirus, EDR alerts, and centralized policy management." },
      { code: "6.7", name: "Data Loss Prevention (DLP)", price: 279, description: "Detect and control sensitive data movement across email, cloud storage, and business apps." },
      { code: "6.8", name: "Compliance & Audit Log Manager", price: 259, description: "Centralize audit logs, retention rules, and reporting to support SOC 2, ISO 27001, and GDPR programs." },
    ],
  },
  {
    id: "developer-tools-analytics",
    number: "07",
    title: "Developer Tools & Business Analytics",
    description: "Software development tools, hosting APIs, and business analytics platforms for technical teams.",
    icon: Code2,
    tools: [
      { code: "7.1", name: "Source Code Hosting", price: 189, description: "Private Git repositories with pull requests, code reviews, and role-based access for engineering teams." },
      { code: "7.2", name: "CI/CD Build Pipelines", price: 229, description: "Managed build and deployment pipelines with parallel jobs, caching, and rollback support." },
      { code: "7.3", name: "Application Performance Monitoring", price: 249, description: "Trace application performance, errors, and slow queries across services with dashboards and alerts." },
      { code: "7.4", name: "Business Intelligence Dashboards", price: 279, description: "Connect databases and warehouses to build BI dashboards and shareable reports for stakeholders." },
      { code: "7.5", name: "Web Analytics Platform", price: 179, description: "Privacy-focused web analytics with page, event, and conversion tracking for business websites." },
      { code: "7.6", name: "Error & Log Management", price: 199, description: "Centralized error tracking and log search with grouping, alerts, and release health monitoring." },
      { code: "7.7", name: "API Management Gateway", price: 259, description: "Publish, secure, and monitor your business APIs with rate limiting, keys, and usage analytics." },
      { code: "7.8", name: "Managed Database Hosting", price: 269, description: "Managed relational and document database hosting with backups, scaling, and monitoring included." },
      { code: "7.9", name: "Business Data Warehouse", price: 349, description: "Cloud data warehouse for reporting and BI with SQL access, scheduled jobs, and role-based security." },
    ],
  },
];

export const ALL_TOOLS = CATEGORIES.flatMap((c) =>
  c.tools.map((t) => ({
    ...t,
    categoryId: c.id,
    categoryTitle: c.title,
    categoryNumber: c.number,
    icon: c.icon,
  })),
);

// Detect platform tag from tool name (business software vendors / stacks).
const PLATFORM_KEYWORDS = [
  "WordPress", "Shopify", "HubSpot", "Salesforce", "Google", "Microsoft",
  "AWS", "Slack", "Zoom",
] as const;

function detectPlatform(name: string): string | null {
  for (const p of PLATFORM_KEYWORDS) {
    if (name.toLowerCase().includes(p.toLowerCase())) return p;
  }
  return null;
}

export type ToolDetail = (typeof ALL_TOOLS)[number] & {
  slug: string;
  platform: string | null;
};

export const TOOL_DETAILS: ToolDetail[] = ALL_TOOLS.map((t) => ({
  ...t,
  slug: t.code.replace(/\./g, "-"),
  platform: detectPlatform(t.name),
}));

export const PLATFORMS_LIST = Array.from(
  new Set(TOOL_DETAILS.map((t) => t.platform).filter(Boolean) as string[]),
);

export function getToolBySlug(slug: string): ToolDetail | undefined {
  return TOOL_DETAILS.find((t) => t.slug === slug);
}