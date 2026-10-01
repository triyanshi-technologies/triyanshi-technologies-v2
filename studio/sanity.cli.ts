import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "eb7crcip", dataset: "production" },
  // `npx sanity deploy` publishes to https://triyanshi.sanity.studio
  studioHost: "triyanshi",
  deployment: { appId: "aw0qu92o527dpt3i8aytuh03", autoUpdates: true },
});
