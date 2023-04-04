import { Feed } from "feed";

import { client } from "../seacretDirectory/seacret";
import { Blog } from "../types/blog";
import { SITE_URL, returnTitle, returnDiscription } from "../libs/const";

export const generateFeed = async () => {
  const feed = new Feed({
    title: returnTitle(),
    description: returnDiscription(),
    id: SITE_URL,
    link: SITE_URL,
    language: "ja",
    copyright: `© 2020 deg84`,
    author: {
      name: "deg84",
    },
    feed: `${SITE_URL}/feed`,
  });

  // 例としてpostsを含めるイメージ
  // このあたりの書き方はライブラリのドキュメントを参考にしてください
  const { posts } = await client.get({ endpoint: "blog" });
  posts?.forEach((post: Blog) => {
    feed.addItem({
      title: returnTitle(post.title),
      description: returnDiscription(post.body),
      date: new Date(post.createdAt),
      id: `${SITE_URL}/blog/${post.id}`,
      link: `${SITE_URL}/blog/${post.id}`,
    });
  });

  // XML形式の文字列にする
  return feed.rss2();
};
