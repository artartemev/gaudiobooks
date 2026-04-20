import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AudioPlayerWrapper } from "@/components/AudioPlayerWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaudiobooks — Аудиокниги на санскрите и русском",
  description:
    "Слушайте вечную мудрость гаудия-вайшнавской традиции. Бхагавад-гита, Шримад-Бхагаватам, Чайтанья-чаритамрита и другие священные тексты в аудиоформате.",
  keywords: ["аудиокниги", "гаудия вайшнавизм", "Бхагавад-гита", "Шримад-Бхагаватам", "Кришна"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}})()` }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AudioPlayerWrapper />
      </body>
    </html>
  );
}
