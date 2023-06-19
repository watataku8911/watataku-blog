import { parseISO, format } from "date-fns";
import { client } from "../seacretDirectory/seacret";
import { Blog, BlogContents, TagsContents } from "../types/blog";

// 日付整形関数
export const datePlasticSurgery = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "yyyy年MM月dd日");
};

export const roundTheLetters = (str: string, cut: number): string => {
  let modStr: string;

  if (str.length > cut) {
    modStr = str.substring(0, cut) + "...";
  } else {
    modStr = str;
  }

  return modStr;
};

// ページング計算
export const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

// microCMSからブログ記事一覧を取得してくる
export const getMicroCMSBlogs = async (
  limit = 10,
  offset = 0,
  filters = ""
): Promise<BlogContents> => {
  const blogList: BlogContents = await client.get({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
      limit: limit,
      offset: offset,
      filters: filters,
    },
  });
  return blogList;
};

// microCMSからブログ記事を取得してくる
export const getMicroCMSBlog = async (
  contentId: string | undefined
): Promise<Blog> => {
  const blog: Blog = await client.get({
    endpoint: "blog",
    contentId: contentId,
  });
  return blog;
};

// microCMSからタグ情報を取得してくる
export const getMicroCMSTag = async (): Promise<TagsContents> => {
  const tag: TagsContents = await client.get({
    endpoint: "tags",
    queries: {
      limit: 15,
    },
  });
  return tag;
};

export const genalateTitleTag = async (
  tagId: string | undefined
): Promise<string> => {
  const tag: Tags = await client.get({
    endpoint: "tags",
    contentId: tagId,
  });
  return tag.tag_name;
};
