export const API_URL =
  process.env.NODE_ENV === "production"
    ? "deploy-site-on-netlify"
    : "http://localhost:8080";
