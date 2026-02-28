"use client";

import type { FeedPost } from "@/app/home/types";
import PostItem from "@/app/home/components/PostItem";

interface PostListProps {
  posts: FeedPost[];
  loading?: boolean;
}

const PostList = ({ posts, loading = false }: PostListProps) => {
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-600 border-t-white" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-12 text-zinc-500">
        No posts yet. Be the first to post!
      </div>
    );
  }

  return (
    <div className="flex-1">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
