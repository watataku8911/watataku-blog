import { client } from "../seacretDirectory/seacret";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import IconSearch from "../public/img/icon_search.svg";
import IconGithub from "../public/img/icon_github.svg";
import { useState, useCallback, useEffect } from "react";
import Modal from "./Modal";
import { TagsContents, Tags } from "../types/blog";

const Header = () => {
  const [tags, setTags] = useState<Tags[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchGetTags()
      .then((tags) => {
        setTags(tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTags]);

  const fetchGetTags = async (): Promise<Tags[]> => {
    const data: TagsContents = await client.get({ endpoint: "tags" });
    return data.contents;
  };

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h3>
          <Link href={"/"}>Watataku's Blog</Link>
        </h3>
        <nav className={styles.navi}>
          <a href="https://watataku-portfolio.web.app" target="_blank">
            ABOUT
          </a>
          <a
            href="https://github.com/watataku8911/watataku-blog"
            target="_blank"
          >
            <IconGithub />
          </a>

          <IconSearch onClick={handleOpen} />
          <Modal
            open={open}
            title={"タグ検索"}
            tags={tags}
            handleClose={handleClose}
          />
        </nav>
      </div>
    </header>
  );
};
export default Header;
