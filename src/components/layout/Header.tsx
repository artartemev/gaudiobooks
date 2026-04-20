"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#EDE4D0] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt="Gaudiobooks logo"
            width={120}
            height={28}
            style={{ height: "28px", width: "auto" }}
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="font-playfair text-[28px] font-bold text-[#1C0F0A] leading-none">
              Gaudiobook
            </span>
            <span className="text-[8px] tracking-widest text-[#6B4C3B] uppercase mt-0.5">
              Аудиокниги. Гаудия Вайшнавизм
            </span>
          </div>
        </Link>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#815854]/20 border-2 border-[#815854]/30 flex items-center justify-center overflow-hidden flex-shrink-0">
          <span className="font-playfair text-sm font-bold text-[#815854]">К</span>
        </div>
      </div>
    </header>
  );
}
