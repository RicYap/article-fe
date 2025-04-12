"use client";

import {
  Box,
  Button,
  debounce,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import Navbar from "@/components/navbar";
import { useCallback, useEffect, useState } from "react";
import Published from "./allPost/published";
import Draft from "./allPost/draft";
import Trashed from "./allPost/trashed";
import api from "@/services/api";
import { ArrowLeft, NavigateBefore, NavigateNext } from "@mui/icons-material";

export default function Home() {
  const [tab, setTab] = useState(1);

  const [params, setParams] = useState({
    page: 1,
    length: 10000,
  });

  const [articlePublished, setArticlePublished] = useState([]);
  const [articleDraft, setArticleDraft] = useState([]);
  const [articleTrashed, setArticleTrashed] = useState([]);

  const debounceMountArticlePagination = useCallback(
    debounce(mountArticlePagination, 400),
    []
  );

  async function mountArticlePagination(limit, offset) {
    var listPublished = [];
    var listDraft = [];
    var listTrashed = [];

    try {
      const getArticle = await api.GetArticlePagination(limit, offset);

      const { data } = getArticle.data;

      if (data !== undefined && data !== null) {
        data.forEach((item) => {
          const status = item.status.toLowerCase();
          console.log("status", status);

          if (status === "publish") {
            listPublished.push(item);
            return;
          }
          if (status === "draft") {
            listDraft.push(item);
            return;
          }
          if (status === "thrash") {
            listTrashed.push(item);
            return;
          }
        });

        console.log("listdraft");

        setArticlePublished(listPublished);
        setArticleDraft(listDraft);
        setArticleTrashed(listTrashed);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (newPage) => {
    if (params.page === newPage) {
      return;
    }

    const newParams = {
      ...params,
      page: newPage,
      length: params.length,
    };
    setParams(newParams);
    debounceMountArticlePagination(newParams.length, newParams.page);
  };

  const handleRowsPerPageChange = async (event, newRows) => {
    if (params.length === newRows) {
      return;
    }
    const newParams = {
      ...params,
      page: 1,
      length: event.target.value,
    };
    setParams(newParams);
    debounceMountArticlePagination(newParams.length, newParams.page);
  };

  useEffect(() => {
    debounceMountArticlePagination(params.length, params.page);
  }, []);

  return (
    <Box>
      <Navbar></Navbar>
      <Divider sx={{ mb: 4, borderBottomWidth: 3 }}></Divider>

      <Tabs
        centered
        value={tab}
        onChange={(e, newTab) => {
          setTab(newTab), setParams({ ...params, page: 1 });
        }}
        sx={{ mb: 2 }}
      >
        <Tab label="Published" value={1} />
        <Tab label="Drafts" value={2} />
        <Tab label="Trashed" value={3} />
      </Tabs>

      {tab === 1 && (
        <Published
          list={articlePublished}
          onSubmit={()=>debounceMountArticlePagination(params.length, params.page)}
        ></Published>
      )}
      {tab === 2 && <Draft list={articleDraft}></Draft>}
      {tab === 3 && <Trashed list={articleTrashed}></Trashed>}
    </Box>
  );
}
