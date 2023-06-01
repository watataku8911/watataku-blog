import React from "react";
import { Blog } from "../types/blog";
import Card from "./Card";

type Props = {
  blogs: Blog[];
};
const BlogList = (props: Props) => {
  return (
    <ul className="w-[1100px] tbpc:w-[95%] maxsp:w-[100%] m-auto flex flex-wrap justify-between maxsp:justify-center after:block after:w-[350px] tbpc:after:w-[30vw]">
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
    </ul>
  );
};

export default BlogList;
