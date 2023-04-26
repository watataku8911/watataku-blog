import { client } from "../seacretDirectory/seacret";
import { BlogContents, Blog } from "../types/blog";
import { SITE_URL, returnTitle, returnDiscription } from "../libs/const";
import RSS from "rss";

const generateFeed = async (): Promise<string> => {
  const feed = new RSS({
    title: returnTitle(),
    description: returnDiscription(),
    site_url: SITE_URL,
    feed_url: "/feed",
    language: "ja",
  });

  // 例としてpostsを含めるイメージ
  // このあたりの書き方はライブラリのドキュメントを参考にしてください
  const data: BlogContents = await client.get({
    endpoint: "blog",
    queries: {
      limit: 999,
    },
  });
  data.contents.forEach((post: Blog) => {
    feed.item({
      title: returnTitle(post.title),
      description: returnDiscription(post.body),
      date: new Date(post.createdAt),
      url: `${SITE_URL}/blog/${post.id}`,
    });
  });

  // XML形式の文字列にする
  return feed.xml();
};

export default generateFeed;
