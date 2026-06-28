import { Activity, Bell, Shield, type LucideIcon } from "lucide-react";

export type BotFeature = { title: string; body: string };
export type Bot = {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  tagline: string;
  teaser: string;
  price: number;
  heroTitle: string;
  heroSub: string;
  ctaLabel: string;
  layout: "bento" | "columns" | "grid";
  icon: LucideIcon;
  accent: string; // tailwind arbitrary color for neon glow
  features: BotFeature[];
};

export const BOTS: Bot[] = [
  {
    slug: "ss-bot",
    code: "SS",
    name: "ServerSensor Bot",
    shortName: "SS Bot",
    tagline: "Behavioral Analytics Infrastructure",
    teaser:
      "Continuously monitors server vital signs autonomously. Establishes behavioral baselines without ever invading member privacy.",
    price: 49,
    heroTitle: "ServerSensor Bot (SS Bot) — The Behavioral Analytics Infrastructure",
    heroSub:
      "The engine cannot retain members if it does not track their departure. SS Bot continuously monitors server vital signs completely autonomously, establishing behavioral baselines without ever invading member privacy.",
    ctaLabel: "Deploy ServerSensor to Discord",
    layout: "bento",
    icon: Activity,
    accent: "#22d3ee",
    features: [
      {
        title: "The Activity Decay Tracker",
        body: "Logs the exact timestamp of every member's last message, reaction, or voice channel join to establish a unique interaction baseline for every user.",
      },
      {
        title: 'The "Fading Vibe" Alert System',
        body: "Automatically triggers a silent database flag when a member's activity drops 60% below their historical baseline, categorizing them as \"At Risk of Churning.\"",
      },
      {
        title: "Contextual Sentiment Tracking",
        body: "Monitors channel navigation patterns in real-time. Notes structural drops in engagement the moment a user shifts away from core discussion forums to only viewing basic announcement feeds.",
      },
    ],
  },
  {
    slug: "srt-bot",
    code: "SRT",
    name: "Server Retention Trigger Bot",
    shortName: "SRT Bot",
    tagline: "Automated Behavioral Responders",
    teaser:
      "Eliminates cold, robotic DMs that push users away. Deploys context-aware nudges that naturally draw fading members back into live chat.",
    price: 79,
    heroTitle: "Server Retention Trigger Bot (SRT Bot) — Automated Behavioral Responders",
    heroSub:
      "Eliminate cold, robotic automated direct messages that force users to leave. SRT Bot deploys context-aware, non-intrusive automated systems to naturally draw fading members back into live chat.",
    ctaLabel: "Deploy Retention Triggers Now",
    layout: "columns",
    icon: Bell,
    accent: "#a855f7",
    features: [
      {
        title: 'The "Direct Interest" Ping-Back Engine',
        body: "Matches fading member preferences with trending topics. If an inactive anime fan's favorite server channel spikes in activity, the bot sends a subtle, hyper-tailored contextual nudge inviting them back to share their perspective.",
      },
      {
        title: '"Ghost-Dropped" Role Perks',
        body: "Re-engages fading members through curated exclusivity. Automatically drops temporary premium roles (e.g. ⚡ Vault Keyholder) to inactive veterans, granting a 48-hour pass to hidden backstage channels showcasing video drafts or behind-the-scenes content.",
      },
      {
        title: "Automated Peer-to-Peer Wakeups",
        body: "Leverages natural social networks. Scans past interactions and prompts an active veteran friend to tag or wave at the fading user, using direct human connection as the ultimate retention tool.",
      },
    ],
  },
  {
    slug: "ssrs-bot",
    code: "SSRS",
    name: "Server Structure Retention System Bot",
    shortName: "SSRS Bot",
    tagline: "The Core Foundation",
    teaser:
      "Builds deep community integration with consistent engagement and mutual trust. Turns your audience into a self-sustaining fan base for the long haul.",
    price: 99,
    heroTitle: "Server Structure Retention System Bot (SSRS Bot) — The Core Foundation",
    heroSub:
      "Build deep community integration that provides consistent engagement, financial stability, and mutual trust. While hitting milestones establishes your physical presence online, SSRS Bot ensures your audience becomes an active, self-sustaining fan base supporting your creative journey long-term.",
    ctaLabel: "Initialize Structural Foundation",
    layout: "grid",
    icon: Shield,
    accent: "#f97316",
    features: [
      {
        title: "Dynamic Progress Milestones",
        body: "Replaces outdated, permanent level 1-100 structures with cyclical \"Community Seasons.\" Automatically resets levels every 30-60 days into legacy archive badges, unlocking fresh seasonal flairs so new users never feel left behind.",
      },
      {
        title: "The Automated Accountability Web",
        body: "Deploys specialized progress-tracking forum channels (e.g. goals, fitness, skill-building). The bot monitors user-created milestone threads and gently bumps them if an update schedule is missed, anchoring users to the community via personal growth.",
      },
    ],
  },
];

export function getBotBySlug(slug: string): Bot | undefined {
  return BOTS.find((b) => b.slug === slug);
}