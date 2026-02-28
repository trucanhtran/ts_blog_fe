"use client";

import { useState, useCallback, useEffect } from "react";
import type { FeedPost } from "@/app/home/types";

// Mock data for local dev; replace with API later
const MOCK_POSTS: FeedPost[] = [
  {
    id: "1",
    username: "t_nguyn_01",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    timeAgo: "22h",
    likeCount: 115,
    replyCount: 1,
  },
  {
    id: "2",
    username: "ming_heng07",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timeAgo: "1d",
    likeCount: 2200,
    replyCount: 12,
  },
  {
    id: "3",
    username: "choose4me.luv",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    timeAgo: "20h",
    likeCount: 89,
    replyCount: 5,
  },
  {
    id: "4",
    username: "xeonong",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    timeAgo: "2d",
    likeCount: 42,
    replyCount: 0,
  },
];

export function useFeed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate network
      await new Promise((r) => setTimeout(r, 400));
      setPosts(MOCK_POSTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const addPost = useCallback((content: string) => {
    const newPost: FeedPost = {
      id: String(Date.now()),
      username: "you",
      content,
      timeAgo: "now",
      likeCount: 0,
      replyCount: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  return { posts, loading, addPost, refetch: fetchFeed };
}
