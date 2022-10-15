export type BlogContents = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};
export type TagsContents = {
  contents: Tags[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type Blog = {
  body: string;
  createdAt: string;
  id: string;
  publishedAt: string;
  revisedAt: string;
  tags: Tags[];
  thumbnail: Thumbnail;
  title: string;
  updatedAt: string;
};

type Thumbnail = {
  url: string;
  height: number;
  width: number;
};

export type Tags = {
  createdAt: string;
  id: string;
  publishedAt: string;
  revisedAt: string;
  tag_name: string;
  updatedAt: string;
};

export type Toc = {
  text: string;
  id: number;
  name: string;
};
