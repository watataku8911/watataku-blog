import React from "react";
import { Blog } from "../types/blog";
import Card from "./Card";

type Props = {
  blogs: Blog[];
};
const BlogList = (props: Props) => {
  return (
    <main className="w-[1100px] tbpc:w-[95%] maxsp:w-[100%] min-h-[calc(100vh_-_170px)] m-auto flex flex-wrap justify-between maxsp:justify-center">
      {props.blogs.map((blog: Blog) => {
        return (
          <Card
            id={blog.id}
            thumbnail={blog.thumbnail.url}
            title={blog.title}
            tags={blog.tags}
            publishedAt={blog.publishedAt}
            key={blog.id}
          />
        );
      })}
    </main>
  );
};

export default BlogList;
