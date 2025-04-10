const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 120000,
});

const get = async () => {
  return await api.get("/", {});
};
