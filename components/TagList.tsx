import React from "react";
import Link from "next/link";
import type { Blog, Tags } from "../types/blog";
import IconTag from "../public/img/icon_tag_navy.svg";

type Props = {
  blog: Blog;
};

const TagList = (props: Props) => {
  return (
    <ul className="flex flex-wrap justify-venter gap-2.5">
      {props.blog.tags.map((tag: Tags) => (
        <li className="flex items-center justify-center" key={tag.id}>
          <IconTag className="dark:fill-white" />
          <Link
            className="text-blue-800 leading-6 dark:border-[#ff36ab] dark:text-[#ff36ab] hover:border-b"
            href={`/search/${tag.id}/page/1`}
          >
            {tag.tag_name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default TagList;
