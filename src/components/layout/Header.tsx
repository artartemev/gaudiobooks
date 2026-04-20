"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#EDE4D0] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Gaudiobooks"
            width={160}
            height={28}
            style={{ height: "28px", width: "auto" }}
            priority
          />
          <span className="text-[9px] tracking-widest text-[#6B4C3B]/70 uppercase hidden sm:block">
            Аудиокниги. Гаудия Вайшнавизм
          </span>
        </Link>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#815854]/20 border-2 border-[#815854]/30 flex items-center justify-center overflow-hidden flex-shrink-0">
          <span className="font-playfair text-sm font-bold text-[#815854]">К</span>
        </div>
      </div>
    </header>
  );
}
