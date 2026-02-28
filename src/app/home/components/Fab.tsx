"use client";

import { PlusIcon } from "@/components/icons";

interface FabProps {
  onClick: () => void;
}

const Fab = ({ onClick }: FabProps) => (
  <button
    type="button"
    onClick={onClick}
    className="fixed bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-white shadow-lg transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-black"
    aria-label="New post"
  >
    <PlusIcon className="h-6 w-6" />
  </button>
);

export default Fab;
