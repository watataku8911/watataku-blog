export type Contents = {
  contents: Blog[];
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
};

type Tags = {
  createdAt: string;
  id: string;
  publishedAt: string;
  revisedAt: string;
  tag_name: string;
  updatedAt: string;
};

type Thumbnail = {
  url: string;
  height: number;
  width: number;
};
