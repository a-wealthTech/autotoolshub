import {
  Zap, Share2, Users, Megaphone, Video, Sparkles, Bot,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tools: { code: string; name: string }[];
};

export const CATEGORIES: Category[] = [
  {
    id: "core-automation",
    number: "01",
    title: "Core Automation & API Infrastructure",
    description: "Foundational APIs, webhooks, SDKs and platform tooling to build automations at scale.",
    icon: Zap,
    tools: [
      { code: "1.1", name: "API by Zapier" },
      { code: "1.2", name: "Webhooks by Zapier" },
      { code: "1.3", name: "Zapier Platform UI" },
      { code: "1.4", name: "Zapier Platform CLI" },
      { code: "1.5", name: "Zapier SDK" },
      { code: "1.6", name: "Zapier MCP (AI Agent Integration)" },
      { code: "1.7", name: "Partner API / Embedded Zapier" },
      { code: "1.8", name: "Code by Zapier" },
      { code: "1.9", name: "Advanced Custom API Connection Framework" },
    ],
  },
  {
    id: "social-triggers",
    number: "02",
    title: "Social Media Auto Trigger & Content Distribution",
    description: "Auto-publish and trigger workflows across every major social platform.",
    icon: Share2,
    tools: [
      { code: "2.1", name: "YouTube Auto Trigger API" },
      { code: "2.2", name: "Twitch Stream Auto Trigger API" },
      { code: "2.3", name: "Facebook Auto Trigger API" },
      { code: "2.4", name: "Instagram Auto Publishing API" },
      { code: "2.5", name: "X (Twitter) Auto Posting API" },
      { code: "2.6", name: "LinkedIn Content Automation API" },
      { code: "2.7", name: "TikTok Content Trigger API" },
      { code: "2.8", name: "Pinterest Auto Publishing API" },
      { code: "2.9", name: "Threads Auto Distribution API" },
    ],
  },
  {
    id: "audience-growth",
    number: "03",
    title: "Audience Growth & Engagement Automation",
    description: "Grow, route, and re-engage your audience with intelligent automation.",
    icon: Users,
    tools: [
      { code: "3.1", name: "Live Stream Notification Trigger API" },
      { code: "3.2", name: "Audience Routing Automation API" },
      { code: "3.3", name: "Community Engagement Automation API" },
      { code: "3.4", name: "Cross-Platform Audience Conversion API" },
      { code: "3.5", name: "Social Signal Monitoring API" },
      { code: "3.6", name: "Viewer Re-engagement Automation API" },
      { code: "3.7", name: "Audience Activity Tracking API" },
      { code: "3.8", name: "Real-Time Interaction Trigger API" },
    ],
  },
  {
    id: "marketing",
    number: "04",
    title: "Marketing & Content Automation",
    description: "Campaigns, leads, CRM sync, and scheduling — wired end-to-end.",
    icon: Megaphone,
    tools: [
      { code: "4.1", name: "Email Marketing Automation API" },
      { code: "4.2", name: "Lead Capture & Routing API" },
      { code: "4.3", name: "CRM Synchronization API" },
      { code: "4.4", name: "Automated Campaign Distribution API" },
      { code: "4.5", name: "Social Media Scheduling & Auto Push-Out API" },
      { code: "4.6", name: "Content Repurposing Automation API" },
      { code: "4.7", name: "Influencer Outreach Automation API" },
      { code: "4.8", name: "Marketing Analytics Integration API" },
    ],
  },
  {
    id: "discord-bots",
    number: "05",
    title: "Custom Discord Bot Marketplace",
    description: "One-click hosting and configuration for plug-and-play Discord bots — moderation, leveling, webhooks, music, and AI agents.",
    icon: Bot,
    tools: [
      { code: "5.1", name: "Moderation & Auto-Mod Bot" },
      { code: "5.2", name: "Leveling & XP Engagement Bot" },
      { code: "5.3", name: "Welcome & Onboarding Bot" },
      { code: "5.4", name: "Ticket & Support Desk Bot" },
      { code: "5.5", name: "Music & Voice Lounge Bot" },
      { code: "5.6", name: "Webhook Relay Bot" },
      { code: "5.7", name: "Social Notification Bot" },
      { code: "5.8", name: "Giveaway & Rewards Bot" },
      { code: "5.9", name: "Reaction Roles Bot" },
      { code: "5.10", name: "AI Chat Companion Bot" },
      { code: "5.11", name: "Twitch / YouTube Live Bot" },
      { code: "5.12", name: "Anti-Raid Security Bot" },
      { code: "5.13", name: "Server Analytics Bot" },
      { code: "5.14", name: "Custom Slash Command Builder Bot" },
    ],
  },
  {
    id: "streaming",
    number: "06",
    title: "Streaming & Creator Ecosystem",
    description: "Built for streamers and creators — alerts, multi-stream, analytics, subs.",
    icon: Video,
    tools: [
      { code: "5.1", name: "Twitch Affiliate Automation API" },
      { code: "5.2", name: "YouTube Creator Automation API" },
      { code: "5.3", name: "Stream Alert Automation API" },
      { code: "5.4", name: "Live Event Trigger API" },
      { code: "5.5", name: "Multi-Stream Distribution API" },
      { code: "5.6", name: "Creator Performance Analytics API" },
      { code: "5.7", name: "Subscriber & Membership Automation API" },
      { code: "5.8", name: "Stream Engagement Tracking API" },
    ],
  },
  {
    id: "ai",
    number: "07",
    title: "AI-Powered Automation",
    description: "AI for content, decisions, qualification, optimization, and growth.",
    icon: Sparkles,
    tools: [
      { code: "6.1", name: "AI by Zapier" },
      { code: "6.2", name: "AI Content Generation API" },
      { code: "6.3", name: "AI Workflow Decision Engine API" },
      { code: "6.4", name: "AI Audience Analysis API" },
      { code: "6.5", name: "AI Lead Qualification API" },
      { code: "6.6", name: "AI Social Media Optimization API" },
      { code: "6.7", name: "AI Audience Growth Automation API" },
      { code: "6.8", name: "AI Engagement Enhancement API" },
      { code: "6.9", name: "AI Conversion Optimization API" },
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

// Deterministic price tiers based on category for demo marketplace pricing.
const PRICE_BY_CATEGORY: Record<string, { monthly: number; yearly: number; trial: boolean }> = {
  "core-automation": { monthly: 79, yearly: 790, trial: true },
  "social-triggers": { monthly: 49, yearly: 490, trial: true },
  "audience-growth": { monthly: 59, yearly: 590, trial: true },
  marketing: { monthly: 69, yearly: 690, trial: true },
  "discord-bots": { monthly: 19, yearly: 190, trial: true },
  streaming: { monthly: 39, yearly: 390, trial: true },
  ai: { monthly: 99, yearly: 990, trial: true },
};

// Detect platform from tool name for badges/filters.
const PLATFORM_KEYWORDS = [
  "YouTube", "Twitch", "Facebook", "Instagram", "TikTok",
  "LinkedIn", "Pinterest", "Threads", "X", "Twitter",
] as const;

function detectPlatform(name: string): string | null {
  for (const p of PLATFORM_KEYWORDS) {
    if (name.toLowerCase().includes(p.toLowerCase())) return p === "Twitter" ? "X" : p;
  }
  return null;
}

export type ToolDetail = (typeof ALL_TOOLS)[number] & {
  slug: string;
  platform: string | null;
  price: { monthly: number; yearly: number; trial: boolean };
};

export const TOOL_DETAILS: ToolDetail[] = ALL_TOOLS.map((t) => ({
  ...t,
  slug: t.code.replace(/\./g, "-"),
  platform: detectPlatform(t.name),
  price: PRICE_BY_CATEGORY[t.categoryId] ?? { monthly: 49, yearly: 490, trial: true },
}));

export const PLATFORMS_LIST = Array.from(
  new Set(TOOL_DETAILS.map((t) => t.platform).filter(Boolean) as string[]),
);

export function getToolBySlug(slug: string): ToolDetail | undefined {
  return TOOL_DETAILS.find((t) => t.slug === slug);
}