import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "一問一答メーカー",
  description: "一問一答メーカー",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
