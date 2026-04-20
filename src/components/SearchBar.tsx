"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = "Поиск книг...", className }: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        "relative flex items-center rounded-xl border transition-all duration-300",
        focused
          ? "border-[#C9A66B]/60 shadow-[0_0_20px_rgba(201,166,107,0.15)]"
          : "border-[#C9A66B]/20",
        "bg-white/5",
        className
      )}
    >
      <Search className="absolute left-4 w-4 h-4 text-[#F7F1E8]/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-transparent text-[#F7F1E8] placeholder-[#F7F1E8]/30 text-sm outline-none"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 p-1 rounded-lg text-[#F7F1E8]/40 hover:text-[#F7F1E8] transition-colors"
          aria-label="Очистить поиск"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
