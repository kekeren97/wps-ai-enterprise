import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WPS AI 企业版｜从一句话到一套交付成果",
  description: "覆盖文档、表格、演示、数据、专家、应用、协作与自动化的企业 AI 工作平台。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
