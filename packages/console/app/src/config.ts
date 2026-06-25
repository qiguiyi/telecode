/**
 * Application-wide constants and configuration
 */
export const config = {
  // Base URL
  baseUrl: "https://telecode.ai",

  // GitHub
  github: {
    repoUrl: "https://github.com/anomalyco/telecode",
    starsFormatted: {
      compact: "160K",
      full: "160,000",
    },
  },

  // Social links
  social: {
    twitter: "https://x.com/telecode",
    discord: "https://discord.gg/telecode",
  },

  // Static stats (used on landing page)
  stats: {
    contributors: "900",
    commits: "13,000",
    monthlyUsers: "7.5M",
  },
} as const
