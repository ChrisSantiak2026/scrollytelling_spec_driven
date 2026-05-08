import { Public_Sans, JetBrains_Mono } from "next/font/google";
import { Atmosphere } from "@/components/visualization/Atmosphere";
import "./globals.css";

const sans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      {/* AUDIT FIX: Added the dark background and atmosphere layer */}
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30">
        <Atmosphere />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}