export async function getMainPropsFromLocal() {
  const articles: any[] = [];
  const tags: any[] = [];

  return ({
    props: {
      articles,
      tags,
    },
  });
}
