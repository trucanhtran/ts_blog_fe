"use client";

import { useState, useCallback, useEffect } from "react";
import type { FeedPost } from "@/app/home/types";
import { createPostsApi, ensureApiSession } from "@/lib/api-client";
import type { Post } from "@ts-blog/api-client";

const formatTimeAgo = (value?: string) => {
  if (!value) return "now";

  const createdAt = new Date(value).getTime();
  const diffMs = Date.now() - createdAt;
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) return "now";
  if (diffMinutes < 60) return `${diffMinutes}m`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;

  return `${Math.floor(diffHours / 24)}d`;
};

const toFeedPost = (post: Post): FeedPost => ({
  id: String(post.id ?? crypto.randomUUID()),
  username: "you",
  content: post.content,
  timeAgo: formatTimeAgo(post.created_at),
  likeCount: 0,
  replyCount: 0,
});

export function useFeed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await ensureApiSession();
      const postsApi = createPostsApi(session.token);
      const response = await postsApi.apiV1PostsGet(1, 20);
      setPosts((response.data.data ?? []).map(toFeedPost));
    } catch {
      setError("Cannot load posts right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const addPost = useCallback(async (content: string) => {
    const session = await ensureApiSession();
    const authorId = session.user.id;

    if (!authorId) {
      throw new Error("Cannot create a post without a user id.");
    }

    const postsApi = createPostsApi(session.token);
    const response = await postsApi.apiV1PostsPost({
      post: {
        title: content.slice(0, 80) || "Untitled",
        content,
        published: true,
        author_id: authorId,
      },
    });

    setPosts((prev) => [toFeedPost(response.data), ...prev]);
  }, []);

  return { posts, loading, error, addPost, refetch: fetchFeed };
}
