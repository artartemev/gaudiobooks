"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, BookAudio } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О проекте" },
  { href: "/donate", label: "Поддержать" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#C9A66B]/20 bg-[#0E0E12]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C9A66B]/10 border border-[#C9A66B]/30 flex items-center justify-center group-hover:bg-[#C9A66B]/20 transition-all duration-300">
              <BookAudio className="w-4 h-4 text-[#C9A66B]" />
            </div>
            <span className="font-playfair text-xl font-bold text-gradient-gold">
              Gaudiobooks
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-[#C9A66B] bg-[#C9A66B]/10"
                    : "text-[#F7F1E8]/70 hover:text-[#F7F1E8] hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#C9A66B] text-[#0E0E12] hover:bg-[#D4B47C] transition-all duration-200 glow-sandalwood-hover"
            >
              Поддержать
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-[#F7F1E8]/70 hover:text-[#F7F1E8] hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Открыть меню"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#C9A66B]/10 bg-[#0E0E12]/98">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-[#C9A66B] bg-[#C9A66B]/10"
                    : "text-[#F7F1E8]/70 hover:text-[#F7F1E8] hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
