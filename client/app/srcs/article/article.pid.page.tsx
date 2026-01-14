/* eslint-disable react/no-danger */
import React from "react";
import Image from "next/image";
import "highlight.js/styles/a11y-dark.css";
import { Article } from "./dto/article";
import Navbar from "../common/common.components/common.components.navbar";
import { Badge, Typography, useTheme } from "@seolim/designsystem";

type Props = {
  content: string;
  article: Article;
  anchorPoints: string[];
};
const ArticlesPidPage: React.FC<Props> = ({
  content,
  article,
  anchorPoints,
}) => {
  const { theme } = useTheme();
  return (
    <div>
      <Navbar />
      <main className="mx-7 lg:mx-6 mt-32 mb-32 flex">
        <div className="max-w-5xl mx-auto">
          <header className="mb-14 mt-28">
            <div className="text-center">
              <Typography size="5xl" weight="bold">
                {article.title}
              </Typography>
            </div>
            <div className="mt-4 flex gap-2 justify-center flex-wrap">
              {article.tags.map((tag) => (
                <Badge text={tag} key={tag} />
              ))}
            </div>
            <div className="mt-10 -mx-7 md:mx-0">
              {article.photo ? (
                <Image
                  src={article.photo}
                  alt={article.title}
                  width={960}
                  height={300}
                  className="w-full max-w-2xl mx-auto object-contain"
                />
              ) : (
                <div className="w-full max-w-2xl mx-auto h-96 bg-slate-200">
                  .
                </div>
              )}
            </div>
          </header>
          <div
            className="prose text-slate-800 max-w-none"
            style={{
              color: theme.color.text.primary,
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="markdown-body"
            />
          </div>
        </div>
        <div className="mt-3 ml-10 max-w-5xl mx-auto hidden lg:block">
          {anchorPoints.length > 0 && (
            <div className="sticky top-30">
              <Typography size="lg" weight="bold">
                목차
              </Typography>
              <ul>
                {anchorPoints.map((anchor) => (
                  <li
                    key={anchor}
                    className="text-base text-slate-500 mt-2 hover:text-slate-900"
                  >
                    <a
                      style={{ color: theme.color.text.tertiary }}
                      href={`#${anchor}`}
                    >
                      {anchor}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default ArticlesPidPage;
