import { Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Public_Sans({ 
  subsets: ["latin"], 
  variable: "--font-public-sans" 
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-jetbrains-mono" 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
    lang="en" 
    className={`${sans.variable} ${mono.variable}`}
    suppressHydrationWarning // AUDIT FIX: Prevents extensions from breaking hydration
    >
      <body>{children}</body>
    </html>
  );
}