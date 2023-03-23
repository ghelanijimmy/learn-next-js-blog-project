const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  const initConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
          port: "",
          pathname: "**",
        },
        {
          protocol: "http",
          hostname: "**",
          port: "",
          pathname: "**",
        },
      ],
    },
  };
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...initConfig,
      env: {
        mongodb_username: "ghelanijimmy",
        mongodb_password: "LearnNextJS",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-blog-site-dev",
      },
    };
  }
  return {
    ...initConfig,
    env: {
      mongodb_username: "ghelanijimmy",
      mongodb_password: "LearnNextJS",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-blog-site-prod",
    },
  };
};

module.exports = nextConfig;
