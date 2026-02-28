"use client";

import type { FeedPost } from "@/app/home/types";
import { PlusIcon, HeartOutlineIcon, CommentIcon, RepostIcon, ShareIcon } from "@/components/icons";

interface PostItemProps {
  post: FeedPost;
}

const PostItem = ({ post }: PostItemProps) => {
  const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n));

  return (
    <article className="border-b border-zinc-800 px-4 py-4">
      <div className="flex gap-3">
        <div className="relative shrink-0">
          <div className="h-10 w-10 rounded-full bg-zinc-700" />
          <button
            type="button"
            className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black bg-zinc-600 text-white hover:bg-zinc-500"
            aria-label="Follow"
          >
            <PlusIcon className="h-3 w-3" />
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">{post.username}</span>
            <span className="text-zinc-500">·</span>
            <time className="text-sm text-zinc-500" dateTime={post.timeAgo}>
              {post.timeAgo}
            </time>
          </div>
          <p className="mt-1 whitespace-pre-wrap break-words text-sm text-zinc-200">
            {post.content}
          </p>
          <button type="button" className="mt-1 text-sm text-zinc-500 hover:underline">
            Translate
          </button>
          <div className="mt-3 flex items-center gap-4 text-zinc-500">
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-red-400"
              aria-label="Like"
            >
              <HeartOutlineIcon className="h-5 w-5" />
              <span className="text-sm">{formatCount(post.likeCount)}</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-zinc-300"
              aria-label="Reply"
            >
              <CommentIcon className="h-5 w-5" />
              <span className="text-sm">{post.replyCount}</span>
            </button>
            <button type="button" className="hover:text-zinc-300" aria-label="Repost">
              <RepostIcon className="h-5 w-5" />
            </button>
            <button type="button" className="hover:text-zinc-300" aria-label="Share">
              <ShareIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
