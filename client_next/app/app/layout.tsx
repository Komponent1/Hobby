import type { Metadata, Viewport } from "next";
import {Noto_Sans_KR} from 'next/font/google';
import "../styles/global.css";
import "../styles/github.markdown.css";

export const metadata: Metadata = {
  title: '모두의 개발',
  description: '모두를 위한 개발 정보',
};
const notoSansKR = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
