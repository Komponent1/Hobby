// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndex } from 'next-sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { articles } = await fetch(`${process.env.BASEURL}/api/articles`).then((res) => res.json());

  return getServerSideSitemapIndex(
    ctx,
    articles.map(({ id }: { id: number }) => `${process.env.SITE_URL}/article/${id}`),
  );
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
