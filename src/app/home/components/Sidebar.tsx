"use client";

import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  HeartIcon,
  ProfileIcon,
  MenuIcon,
} from "@/components/icons";

const navItems = [
  { label: "Home", icon: HomeIcon },
  { label: "Search", icon: SearchIcon },
  { label: "Create", icon: PlusIcon, highlight: true },
  { label: "Activity", icon: HeartIcon, dot: true },
  { label: "Profile", icon: ProfileIcon },
  { label: "Menu", icon: MenuIcon },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-16 flex-col items-center border-r border-zinc-800 bg-black py-4">
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-black">
        A
      </div>
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navItems.map(({ label, icon: Icon, highlight, dot }) => (
          <button
            key={label}
            type="button"
            className="relative flex h-12 w-12 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            title={label}
            aria-label={label}
          >
            {highlight ? (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 text-white">
                <Icon className="h-5 w-5" />
              </span>
            ) : (
              <Icon className="h-6 w-6" />
            )}
            {dot && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
