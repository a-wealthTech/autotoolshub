import {
  Zap, Share2, Users, Megaphone, Video, Sparkles, Bot,
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
    id: "core-automation",
    number: "01",
    title: "Core Automation & API Infrastructure",
    description: "Foundational APIs, webhooks, SDKs and platform tooling to build automations at scale.",
    icon: Zap,
    tools: [
      { code: "1.1", name: "API by Zapier", price: 229, description: "Connect any REST or GraphQL API to your Zaps without writing a custom integration — configure auth, endpoints, headers, and query params from a no-code form." },
      { code: "1.2", name: "Webhooks by Zapier", price: 159, description: "Send and receive HTTP webhooks in any Zap. Catch incoming POST/GET payloads or POST JSON to external services to trigger downstream automations." },
      { code: "1.3", name: "Zapier Platform UI", price: 249, description: "Browser-based builder for publishing your own Zapier integration — define triggers, actions, and searches with a visual editor and instant test runs." },
      { code: "1.4", name: "Zapier Platform CLI", price: 199, description: "Node.js command-line toolkit for building, versioning, and deploying custom Zapier integrations from your local environment with full Git workflow support." },
      { code: "1.5", name: "Zapier SDK", price: 189, description: "Official JavaScript/TypeScript SDK for shaping requests, parsing responses, and defining schemas inside a custom Zapier integration." },
      { code: "1.6", name: "Zapier MCP (AI Agent Integration)", price: 309, description: "Expose Zapier's 7,000+ app actions as Model Context Protocol tools so Claude, ChatGPT, and other AI agents can trigger real workflows." },
      { code: "1.7", name: "Partner API / Embedded Zapier", price: 279, description: "Embed Zapier's integration directory and Zap editor directly inside your own SaaS product using the Partner API and Embed components." },
      { code: "1.8", name: "Code by Zapier", price: 169, description: "Run custom JavaScript or Python steps inside any Zap with input data, helper libraries, and structured output passed to the next step." },
      { code: "1.9", name: "Advanced Custom API Connection Framework", price: 259, description: "Production framework for wiring unsupported APIs into automations — OAuth 2.0, API keys, pagination, retry logic, and rate-limit handling out of the box." },
    ],
  },
  {
    id: "social-triggers",
    number: "02",
    title: "Social Media Auto Trigger & Content Distribution",
    description: "Auto-publish and trigger workflows across every major social platform.",
    icon: Share2,
    tools: [
      { code: "2.1", name: "YouTube Auto Trigger API", price: 189, description: "Fires real-time workflows when a channel uploads a video, goes live, hits a subscriber milestone, or receives a new comment via the YouTube Data v3 API." },
      { code: "2.2", name: "Twitch Stream Auto Trigger API", price: 179, description: "Listens to Twitch EventSub for stream.online, follow, subscription, raid, and cheer events and pushes them into your automations as webhooks." },
      { code: "2.3", name: "Facebook Auto Trigger API", price: 199, description: "Publishes posts, photos, and reels to Facebook Pages and reacts to new page comments or messages using the Graph API." },
      { code: "2.4", name: "Instagram Auto Publishing API", price: 209, description: "Schedules and publishes feed posts, reels, carousels, and stories to Instagram Business accounts via the official Content Publishing API." },
      { code: "2.5", name: "X (Twitter) Auto Posting API", price: 219, description: "Publishes tweets, threads, replies, and media uploads through the X API v2 with built-in rate-limit smoothing and OAuth 2.0." },
      { code: "2.6", name: "LinkedIn Content Automation API", price: 229, description: "Publishes text, image, video, and document posts to LinkedIn personal profiles and Company Pages using UGC and Posts APIs." },
      { code: "2.7", name: "TikTok Content Trigger API", price: 239, description: "Uploads videos, schedules drafts, and listens for new posts via the TikTok Content Posting API and Display API webhooks." },
      { code: "2.8", name: "Pinterest Auto Publishing API", price: 169, description: "Creates pins, boards, and product pins programmatically using the Pinterest API v5 with rich pin metadata support." },
      { code: "2.9", name: "Threads Auto Distribution API", price: 159, description: "Cross-posts content from any source to Meta Threads using the official Threads Graph API, including media and reply chains." },
    ],
  },
  {
    id: "audience-growth",
    number: "03",
    title: "Audience Growth & Engagement Automation",
    description: "Grow, route, and re-engage your audience with intelligent automation.",
    icon: Users,
    tools: [
      { code: "3.1", name: "Live Stream Notification Trigger API", price: 199, description: "Detects when creators go live on Twitch, YouTube, Kick, or TikTok and instantly fans the event out to Discord, email, SMS, and push channels." },
      { code: "3.2", name: "Audience Routing Automation API", price: 219, description: "Segments and routes new followers, subscribers, and signups into the right CRM list, Discord role, or email sequence based on rules you define." },
      { code: "3.3", name: "Community Engagement Automation API", price: 209, description: "Auto-replies to comments, DMs, and mentions across Instagram, X, YouTube, and TikTok with templated responses and AI fallback." },
      { code: "3.4", name: "Cross-Platform Audience Conversion API", price: 249, description: "Tracks a viewer from a social impression to a paid conversion across multiple platforms and pushes attributed events into your CRM." },
      { code: "3.5", name: "Social Signal Monitoring API", price: 189, description: "Streams brand mentions, hashtag activity, and keyword alerts from X, Reddit, YouTube, and TikTok with sentiment scoring." },
      { code: "3.6", name: "Viewer Re-engagement Automation API", price: 179, description: "Identifies dormant subscribers and followers, then triggers personalized re-engagement campaigns via email, push, and Discord DM." },
      { code: "3.7", name: "Audience Activity Tracking API", price: 169, description: "Logs every like, view, comment, share, and watch-time event per user into a unified audience timeline you can query by REST." },
      { code: "3.8", name: "Real-Time Interaction Trigger API", price: 229, description: "Sub-second webhook delivery for chat messages, raids, donations, polls, and reactions during live broadcasts." },
    ],
  },
  {
    id: "marketing",
    number: "04",
    title: "Marketing & Content Automation",
    description: "Campaigns, leads, CRM sync, and scheduling — wired end-to-end.",
    icon: Megaphone,
    tools: [
      { code: "4.1", name: "Email Marketing Automation API", price: 209, description: "Trigger, personalize, and send transactional and drip email campaigns through Mailchimp, SendGrid, Resend, and Klaviyo from one API." },
      { code: "4.2", name: "Lead Capture & Routing API", price: 189, description: "Captures leads from forms, ads, and landing pages, deduplicates them, and routes each lead to the right sales rep or sequence." },
      { code: "4.3", name: "CRM Synchronization API", price: 239, description: "Two-way sync of contacts, companies, deals, and activities between HubSpot, Salesforce, Pipedrive, and Zoho with conflict resolution." },
      { code: "4.4", name: "Automated Campaign Distribution API", price: 219, description: "Distributes a single campaign asset across email, SMS, push, and social ad platforms with channel-specific formatting." },
      { code: "4.5", name: "Social Media Scheduling & Auto Push-Out API", price: 199, description: "Queue posts for Instagram, X, LinkedIn, TikTok, Facebook, and Pinterest from one endpoint with timezone-aware scheduling." },
      { code: "4.6", name: "Content Repurposing Automation API", price: 229, description: "Turns long-form video and blog content into short clips, threads, carousels, and email snippets using AI transcription and reframing." },
      { code: "4.7", name: "Influencer Outreach Automation API", price: 249, description: "Discovers creators by niche and audience size, scores fit, and runs personalized outreach sequences with reply tracking." },
      { code: "4.8", name: "Marketing Analytics Integration API", price: 179, description: "Unifies GA4, Meta Ads, Google Ads, TikTok Ads, and HubSpot data into a single normalized reporting endpoint." },
    ],
  },
  {
    id: "discord-bots",
    number: "05",
    title: "Custom Discord Bot Marketplace",
    description: "One-click hosting and configuration for plug-and-play Discord bots — moderation, leveling, webhooks, music, and AI agents.",
    icon: Bot,
    tools: [
      { code: "5.1", name: "Moderation & Auto-Mod Bot", price: 219, description: "Filters spam, slurs, links, and invites with regex and AI classifiers. Issues warns, mutes, kicks, and bans with full audit logging." },
      { code: "5.2", name: "Leveling & XP Engagement Bot", price: 199, description: "Awards XP for messages and voice activity, with per-channel multipliers, role rewards, and a public leaderboard widget." },
      { code: "5.3", name: "Welcome & Onboarding Bot", price: 189, description: "Sends branded welcome cards, DMs onboarding guides, and walks new members through verification, rules, and role selection." },
      { code: "5.4", name: "Ticket & Support Desk Bot", price: 239, description: "Opens private support threads from a button or slash command, with staff claim, transcripts, SLA timers, and ticket close logs." },
      { code: "5.5", name: "Music & Voice Lounge Bot", price: 209, description: "High-quality music playback from YouTube, Spotify, and SoundCloud with queues, filters, lyrics, and 24/7 voice channel support." },
      { code: "5.6", name: "Webhook Relay Bot", price: 229, description: "Receives webhooks from GitHub, Stripe, Sentry, Zapier, and custom sources and posts formatted embeds into the channel of your choice." },
      { code: "5.7", name: "Social Notification Bot", price: 249, description: "Posts to your server when accounts you follow on YouTube, X, TikTok, Instagram, or Reddit go live or publish new content." },
      { code: "5.8", name: "Giveaway & Rewards Bot", price: 259, description: "Runs timed giveaways with role requirements, entry boosters, multi-winner draws, and reroll commands, plus a points/store system." },
      { code: "5.9", name: "Reaction Roles Bot", price: 199, description: "Lets members self-assign roles by reacting to a message or clicking a button — supports unique, verified, and tiered role groups." },
      { code: "5.10", name: "AI Chat Companion Bot", price: 289, description: "Conversational AI assistant powered by GPT-class models with per-channel personas, memory, image generation, and content moderation." },
      { code: "5.11", name: "Twitch / YouTube Live Bot", price: 269, description: "Announces stream starts, VOD uploads, and milestone events for any Twitch or YouTube channel with custom embeds and role pings." },
      { code: "5.12", name: "Anti-Raid Security Bot", price: 279, description: "Detects join floods, suspicious accounts, and mass mentions, then auto-locks the server, quarantines raiders, and alerts staff." },
      { code: "5.13", name: "Server Analytics Bot", price: 229, description: "Tracks member growth, retention, channel activity, voice minutes, and top contributors with daily, weekly, and monthly reports." },
      { code: "5.14", name: "Custom Slash Command Builder Bot", price: 249, description: "Visual builder for custom slash commands with arguments, embeds, role checks, and webhook actions — no code required." },
    ],
  },
  {
    id: "streaming",
    number: "06",
    title: "Streaming & Creator Ecosystem",
    description: "Built for streamers and creators — alerts, multi-stream, analytics, subs.",
    icon: Video,
    tools: [
      { code: "6.1", name: "Twitch Affiliate Automation API", price: 199, description: "Automates Twitch Affiliate workflows — bit/sub goals, reward redemptions, payout milestones, and channel-points actions." },
      { code: "6.2", name: "YouTube Creator Automation API", price: 219, description: "Automates uploads, end-screens, playlist additions, community posts, and Super Chat reactions for YouTube creators." },
      { code: "6.3", name: "Stream Alert Automation API", price: 179, description: "Triggers on-screen alerts for follows, subs, donations, raids, and bits across OBS, Streamlabs, and Streamelements." },
      { code: "6.4", name: "Live Event Trigger API", price: 229, description: "Schedules and triggers automated actions during a live stream — scene changes, overlays, polls, and giveaway draws." },
      { code: "6.5", name: "Multi-Stream Distribution API", price: 269, description: "Simulcasts a single RTMP feed to Twitch, YouTube, Kick, Facebook, X, and TikTok Live with per-platform metadata." },
      { code: "6.6", name: "Creator Performance Analytics API", price: 209, description: "Aggregates views, watch time, CCV, follower delta, and revenue across every streaming and video platform into one dashboard." },
      { code: "6.7", name: "Subscriber & Membership Automation API", price: 239, description: "Manages Twitch subs, YouTube memberships, Patreon, and Ko-fi — assigns perks, Discord roles, and renewal reminders automatically." },
      { code: "6.8", name: "Stream Engagement Tracking API", price: 189, description: "Measures chat velocity, emote usage, sentiment, and viewer drop-off in real time and feeds the data into your automations." },
    ],
  },
  {
    id: "ai",
    number: "07",
    title: "AI-Powered Automation",
    description: "AI for content, decisions, qualification, optimization, and growth.",
    icon: Sparkles,
    tools: [
      { code: "7.1", name: "AI by Biztrait", price: 349, description: "Unified AI gateway across OpenAI, Anthropic, Google, and open-source models with routing, fallback, caching, and usage analytics." },
      { code: "7.2", name: "AI Content Generation API", price: 289, description: "Generates long-form posts, short-form captions, headlines, scripts, and images on-brand using your tone, examples, and style guide." },
      { code: "7.3", name: "AI Workflow Decision Engine API", price: 309, description: "Drop-in decision node that reads workflow context and chooses the next branch using an LLM with structured JSON output and guardrails." },
      { code: "7.4", name: "AI Audience Analysis API", price: 259, description: "Clusters your audience by behavior, interest, and intent, then returns segments, personas, and recommended next actions." },
      { code: "7.5", name: "AI Lead Qualification API", price: 269, description: "Scores inbound leads on fit and intent using firmographic enrichment and conversation analysis, then tags hot leads for sales." },
      { code: "7.6", name: "AI Social Media Optimization API", price: 229, description: "Rewrites posts for each platform, picks optimal send times, suggests hashtags, and A/B-tests variants for engagement lift." },
      { code: "7.7", name: "AI Audience Growth Automation API", price: 249, description: "Recommends follow/engage targets, optimal content cadence, and growth experiments based on competitor and niche analysis." },
      { code: "7.8", name: "AI Engagement Enhancement API", price: 199, description: "Generates context-aware replies, comment responses, and DMs that match your brand voice and flag responses for human review." },
      { code: "7.9", name: "AI Conversion Optimization API", price: 279, description: "Analyzes funnel events, runs LLM-driven hypotheses, and suggests page, copy, and offer experiments ranked by expected lift." },
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