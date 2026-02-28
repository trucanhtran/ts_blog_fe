"use client";

import CreatePostInput from "@/app/home/components/CreatePostInput";
import { ChevronDownIcon } from "@/components/icons";

interface HeaderProps {
  newPostContent: string;
  onNewPostChange: (value: string) => void;
  onPostSubmit: () => void;
  submitting?: boolean;
}

const Header = ({
  newPostContent,
  onNewPostChange,
  onPostSubmit,
  submitting = false,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800 bg-black px-4 py-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg py-2 pr-2 text-left text-sm font-medium text-zinc-300 hover:bg-zinc-800"
        >
          For you
          <ChevronDownIcon className="h-4 w-4 text-zinc-500" />
        </button>
      </div>
      <CreatePostInput
        value={newPostContent}
        onChange={onNewPostChange}
        onSubmit={onPostSubmit}
        submitting={submitting}
        placeholder="What's new?"
      />
    </header>
  );
};

export default Header;
