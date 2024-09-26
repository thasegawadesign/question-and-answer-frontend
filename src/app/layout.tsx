import "@/globals.css";
import NextAuthProvider from "@/providers/nextAuth";
import clsx from "clsx";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

export const metadata: Metadata = {
  title: "一問一答メーカー",
  description: "一問一答メーカー",
};

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={clsx(notoSansJP.className)}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
