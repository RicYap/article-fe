"use client";

import { Box, Divider, Tab, Tabs } from "@mui/material";
import Navbar from "@/components/navbar";
import { useState } from "react";
import Published from "./allPost/published";
import Draft from "./allPost/draft";
import Thrashed from "./allPost/thrashed";

export default function Home() {
  const [tab, setTab] = useState(1);

  return (
    <Box>
      <Navbar></Navbar>
      <Divider sx={{ mb: 4, borderBottomWidth: 3 }}></Divider>

      <Tabs centered value={tab} onChange={(e, newTab) => setTab(newTab)} sx={{mb:2}}>
        <Tab label="Published" value={1} />
        <Tab label="Drafts" value={2} />
        <Tab label="Thrashed" value={3} />
      </Tabs>

      {tab === 1 && <Published></Published>}
      {tab === 2 && <Draft></Draft>}
      {tab === 3 && <Thrashed></Thrashed>}
    </Box>
  );
}
