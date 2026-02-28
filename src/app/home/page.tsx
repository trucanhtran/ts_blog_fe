"use client";

import { useCallback } from "react";

import Sidebar from "@/app/home/components/Sidebar";
import Header from "@/app/home/components/Header";
import PostList from "@/app/home/components/PostList";
import Fab from "@/app/home/components/Fab";
import { useFeed } from "@/app/home/hooks/useFeed";
import { useCreatePost } from "@/app/home/hooks/useCreatePost";

const HomePage = () => {
  const { posts, loading, addPost } = useFeed();
  const handleSubmit = useCallback(
    (content: string) => {
      addPost(content);
    },
    [addPost]
  );
  const { content, setContent, submit, submitting } = useCreatePost(handleSubmit);

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
        <div className="flex-1 overflow-y-auto">
          <PostList posts={posts} loading={loading} />
        </div>
      </main>
      <Fab onClick={submit} />
    </div>
  );
};

export default HomePage;
