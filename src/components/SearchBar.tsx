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

export function SearchBar({
  value,
  onChange,
  placeholder = "Поиск книг...",
  className,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn("relative flex items-center rounded-xl border transition-all duration-300", className)}
      style={{
        background: "var(--bg-2)",
        borderColor: focused ? "var(--accent)" : "var(--border)",
        boxShadow: focused ? "0 0 0 2px color-mix(in srgb, var(--accent) 20%, transparent)" : undefined,
      }}
    >
      <Search className="absolute left-4 w-4 h-4" style={{ color: "var(--text-3)" }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-transparent text-sm outline-none"
        style={{ color: "var(--text)" }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 p-1 rounded-lg transition-colors hover:opacity-80"
          style={{ color: "var(--text-3)" }}
          aria-label="Очистить поиск"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
