import React from "react";
import Link from "next/link";
import type { Blog, Tags } from "../types/blog";
import IconTag from "../public/img/icon_tag_navy.svg";
import styles from "../styles/TagList.module.css";

type Props = {
  blog: Blog;
};

const TagList = (props: Props) => {
  return (
    <ul className={styles.tags}>
      {props.blog.tags.map((tag: Tags) => (
        <li className={styles["tags__tag"]} key={tag.id}>
          <IconTag />
          <Link href={`/search/${tag.id}/page/1`}>{tag.tag_name}</Link>
        </li>
      ))}
    </ul>
  );
};
export default TagList;
