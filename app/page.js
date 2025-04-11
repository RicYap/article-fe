"use client";

import { Box, debounce, Divider, Tab, Tabs } from "@mui/material";
import Navbar from "@/components/navbar";
import { useCallback, useEffect, useState } from "react";
import Published from "./allPost/published";
import Draft from "./allPost/draft";
import Trashed from "./allPost/trashed";
import api from "@/services/api";

export default function Home() {
  const [tab, setTab] = useState(1);

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

          if (status === "publish") {
            listPublished.push(item);
            return;
          }
          if (status === "draft") {
            listDraft.push(item);
            return;
          }
          if (status === "thrashed") {
            listTrashed.push(item);
            return;
          }
        });

        setArticlePublished(listPublished)
        setArticleDraft(listDraft)
        setArticleTrashed(listTrashed)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    debounceMountArticlePagination(5, 1)
  },[])

  return (
    <Box>
      <Navbar></Navbar>
      <Divider sx={{ mb: 4, borderBottomWidth: 3 }}></Divider>

      <Tabs
        centered
        value={tab}
        onChange={(e, newTab) => setTab(newTab)}
        sx={{ mb: 2 }}
      >
        <Tab label="Published" value={1} />
        <Tab label="Drafts" value={2} />
        <Tab label="Trashed" value={3} />
      </Tabs>

      {tab === 1 && <Published list={articlePublished}></Published>}
      {tab === 2 && <Draft list={articleDraft}></Draft>}
      {tab === 3 && <Trashed list={articleTrashed}></Trashed>}
    </Box>
  );
}
