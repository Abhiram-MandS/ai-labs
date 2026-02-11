import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Labs - Knowledge Base",
  description: "Your comprehensive knowledge base for AI prompts, skills, tips, docs, and resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
