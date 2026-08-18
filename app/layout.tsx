import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WPS AI 企业版｜让 AI 成为组织的工作方式",
  description: "由 WPS Comate 驱动的企业 AI 生产力平台，统一额度、任务执行、团队协作与安全治理。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
