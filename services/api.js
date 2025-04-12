import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 10000,
});

const CreateArticle = async (body) => {
  return await api.post(`/article`, body, {});
};

const GetArticlePagination = async (limit, offset) => {
  return await api.get(`/article/${limit}/${offset}`, {});
};

const GetArticleById = async (id) => {
  return await api.get(`/article/${id}`, {});
};

const EditArticle = async (id, body) => {
  return await api.put(`/article/${id}`, body, {});
};

export default {
  CreateArticle,
  GetArticlePagination,
  GetArticleById,
  EditArticle,
};
