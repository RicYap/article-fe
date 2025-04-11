import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 10000,
});

const GetArticlePagination = async (limit, offset) => {
  return await api.get(`/article/${limit}/${offset}`, {});
};

const GetArticleById = async (id) => {
  return await api.get(`/${id}`, {});
};

export default {
  GetArticlePagination,
  GetArticleById,
}
