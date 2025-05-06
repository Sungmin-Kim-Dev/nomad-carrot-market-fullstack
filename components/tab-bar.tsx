"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatBubbleOvalLeftEllipsisIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatBubbleOvalLeftEllipsisIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 mx-auto grid w-full max-w-xl grid-cols-5 border-t border-neutral-600 px-5 py-3 *:flex *:flex-col *:items-center *:gap-px *:text-white">
      <Link href="/products" className="*:first:size-7">
        {pathname === "/products" ? <SolidHomeIcon /> : <OutlineHomeIcon />}
        <span>Home</span>
      </Link>
      <Link href="/life" className="*:first:size-7">
        {pathname === "/life" ? (
          <SolidNewspaperIcon />
        ) : (
          <OutlineNewspaperIcon />
        )}
        <span>Life</span>
      </Link>
      <Link href="/chat" className="*:first:size-7">
        {pathname === "/chat" ? (
          <SolidChatBubbleOvalLeftEllipsisIcon />
        ) : (
          <OutlineChatBubbleOvalLeftEllipsisIcon />
        )}
        <span>Chat</span>
      </Link>
      <Link href="/live" className="*:first:size-7">
        {pathname === "/live" ? (
          <SolidVideoCameraIcon />
        ) : (
          <OutlineVideoCameraIcon />
        )}
        <span>Shopping</span>
      </Link>
      <Link href="/profile" className="*:first:size-7">
        {pathname === "/profile" ? <SolidUserIcon /> : <OutlineUserIcon />}
        <span>Profile</span>
      </Link>
    </div>
  );
}
