"use client";

import { useCallback } from "react";

import Sidebar from "@/app/home/components/Sidebar";
import Header from "@/app/home/components/Header";
import PostList from "@/app/home/components/PostList";
import Fab from "@/app/home/components/Fab";
import { useFeed } from "@/app/home/hooks/useFeed";
import { useCreatePost } from "@/app/home/hooks/useCreatePost";

const HomePage = () => {
  const { posts, loading, error: feedError, addPost } = useFeed();
  const handleSubmit = useCallback(
    async (content: string) => {
      await addPost(content);
    },
    [addPost]
  );
  const { content, setContent, submit, submitting, error: postError } = useCreatePost(handleSubmit);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="ml-16 flex min-h-screen flex-1 flex-col">
        <Header
          newPostContent={content}
          onNewPostChange={setContent}
          onPostSubmit={submit}
          submitting={submitting}
        />
        {(feedError || postError) && (
          <div className="border-b border-red-900 bg-red-950/50 px-4 py-2 text-sm text-red-200">
            {postError || feedError}
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          <PostList posts={posts} loading={loading} />
        </div>
      </main>
      <Fab onClick={submit} />
    </div>
  );
};

export default HomePage;
