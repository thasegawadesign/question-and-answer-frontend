import NextAuthProvider from "@/providers/nextAuth";
import { GoogleAnalytics } from "@next/third-parties/google";
import clsx from "clsx";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "一問一答メーカー",
  description: "一問一答メーカー",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

const isProduction = process.env.NODE_ENV === "production";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
      </head>
      <body className={clsx(notoSansJP.className)}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
      {isProduction && <GoogleAnalytics gaId={process.env.GA_ID || ""} />}
    </html>
  );
}
