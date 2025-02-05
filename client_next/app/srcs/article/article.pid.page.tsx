/* eslint-disable react/no-danger */
import React from 'react';
import Image from "next/image";
import "highlight.js/styles/a11y-dark.css";
import { Article } from "./dto/article";
import Navbar from "../common/common.components/common.components.navbar";

type Props = {
  content: string;
  article: Article;
  anchorPoints: string[];
};
const ArticlesPidPage: React.FC<Props> = ({content, article, anchorPoints}) => (
  <div>
    <Navbar />
    <main className="mx-7 lg:mx-6 mt-32 mb-32 flex">
      <div className="max-w-5xl mx-auto">
        <header className="mb-14 mt-28">
          <h1 className="text-3xl text-center font-bold leading-normal text-slate-900 mt-0 mb-3">
            {article.title}
          </h1>
          <div className="mt-3 text-center">
            {article.tags.map((tag) => (
              <p key={tag} className="inline-block bg-slate-200 rounded-full px-3 py-1 text-sm font-medium text-slate-700 m-0.5">
                {tag}
              </p>
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
              <div className="w-full max-w-2xl mx-auto h-96 bg-slate-200">.</div>
            )}
          </div>
        </header>
        <div className="prose text-slate-800 max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} className="markdown-body" />
        </div>
      </div>
      <div className="mt-10 max-w-5xl mx-auto hidden lg:block">
        {anchorPoints.length > 0 && (
          <div className="sticky top-128">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">목차</h2>
            <ul>
              {anchorPoints.map((anchor) => (
                <li key={anchor} className="text-base text-slate-500 mt-2 hover:text-slate-900">
                  <a href={`#${anchor}`}>{anchor}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  </div>
);
export default ArticlesPidPage;
