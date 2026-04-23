import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miki × Tea — premijera sezone 🎭🦋",
  description:
    "Repertoar dejtova za najbolju amatersku glumicu i njenog ličnog reditelja 💗",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
