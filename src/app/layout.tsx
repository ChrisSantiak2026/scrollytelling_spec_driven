import { Public_Sans, JetBrains_Mono } from "next/font/google";
import { Atmosphere } from "@/components/visualization/Atmosphere"; // Import the agent
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
      suppressHydrationWarning 
    >
      <body className="bg-slate-950 text-slate-100 antialiased">
        {/* Global Atmospheric Layers */}
        <Atmosphere />
        
        {/* Main Content Stage */}
        <main className="main-stage">
          {children}
        </main>
      </body>
    </html>
  );
}