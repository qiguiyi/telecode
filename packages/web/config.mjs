const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://telecode.ai" : `https://${stage}.telecode.ai`,
  console: stage === "production" ? "https://telecode.ai/auth" : `https://${stage}.telecode.ai/auth`,
  email: "help@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/anomalyco/telecode",
  discord: "https://telecode.ai/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
