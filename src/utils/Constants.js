const API_URL =
  import.meta.env.MODE === "production"
    ? "/api"
    : "http://localhost:5000/api";

export { API_URL };