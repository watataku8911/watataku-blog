import React from "react";
import TagList from "./TagList";
import TableOfContents from "./TableOfContents";
import { Blog, Toc } from "../types/blog";

type Props = {
  blog: Blog;
  toc: Toc[];
};
const SideBar = (props: Props) => {
  return (
    <aside className="pc:w-80 pc:h-96 pc:sticky pc:top-0">
      <div className="bg-white dark:bg-black overflow-auto p-4 h-24 maxpc:h-auto pc:mb-5 rounded-3xl maxpc:order-1 maxpc:rounded-b-none">
        <TagList blog={props.blog} />
      </div>

      <div className="bg-white dark:bg-black overflow-auto px-4 pt-4 rounded-3xl h-64 maxpc:h-auto maxpc:pb-20 maxpc:order-1 maxpc:rounded-none">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">目次</h2>
        <TableOfContents toc={props.toc} />
      </div>
    </aside>
  );
};

export default SideBar;
