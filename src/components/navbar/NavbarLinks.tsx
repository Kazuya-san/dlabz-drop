"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineViewfinderCircle, HiHome } from "react-icons/hi2";
import { TbTournament } from "react-icons/tb";
import { MdOutlineLeaderboard } from "react-icons/md";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/dashboard",
    icon: <HiHome size={24} />,
  },
  {
    id: 1,
    name: "Match Finder",
    href: "/match-finder",
    icon: <HiOutlineViewfinderCircle size={24} />,
  },
  {
    id: 3,
    name: "Tournaments",
    href: "/tournaments",
    icon: <TbTournament size={24} />,
  },
  {
    id: 4,
    name: "Leaderboard",
    href: "/leaderboard",
    icon: <MdOutlineLeaderboard size={24} />,
  },
];

export function NavbarLinks() {
  const location = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75",
            "group flex items-center px-4 py-2 font-semibold rounded-md gap-x-1"
          )}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  );
}
