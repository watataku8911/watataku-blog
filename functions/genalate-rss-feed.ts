import RSS from "rss";

import { client } from "../seacretDirectory/seacret";
import { Blog } from "../types/blog";
import { SITE_URL, returnTitle } from "../libs/const";

async function generateFeedXml() {
  const feed = new RSS({
    title: returnTitle(),
    description: "",
    site_url: `${SITE_URL}`,
    feed_url: `${SITE_URL}/feed`,
    language: "ja",
  });

  // 例としてpostsを含めるイメージ
  // このあたりの書き方はライブラリのドキュメントを参考にしてください
  const { posts } = await client.get({ endpoint: "blog" });
  posts?.forEach((post: Blog) => {
    feed.item({
      title: returnTitle(post.title),
      description: post.body,
      date: new Date(post.createdAt),
      url: `${SITE_URL}/blog/${post.id}`,
    });
  });

  // XML形式の文字列にする
  return feed.xml();
}

export default generateFeedXml;
