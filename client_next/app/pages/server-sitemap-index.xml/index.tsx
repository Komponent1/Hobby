// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { articles } = await fetch(`${process.env.BASEURL}/api/articles`).then((res) => res.json());
  const lastmod = new Date().toISOString();
  const field = articles.map(({ id }: { id: number }) => ({
    loc: `${process.env.SITE_URL}/article/${id}`,
    changefreq: 'daily',
    priority: '1.0',
    lastmod,
  }));

  return getServerSideSitemap(
    ctx,
    field,
  );
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
