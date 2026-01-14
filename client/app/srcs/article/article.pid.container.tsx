import { ThemeProvider } from "@seolim/designsystem";
import { Article } from "./dto/article";
import ArticlesPidPage from "./article.pid.page";

type Props = {
  content: string;
  article: Article;
  anchorPoints: string[];
};
const ArticlePidContainer: React.FC<Props> = ({
  content,
  article,
  anchorPoints,
}) => (
  <ThemeProvider>
    <ArticlesPidPage
      content={content}
      article={article}
      anchorPoints={anchorPoints}
    />
  </ThemeProvider>
);
export default ArticlePidContainer;
