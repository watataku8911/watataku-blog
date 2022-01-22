import { client } from "../seacretDirectory/seacret";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import IconSearch from "../public/img/icon_search.svg";
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
          <Link href={"/"}>Watataku&apos;s Blog</Link>
        </h3>
        <nav className={styles.navi}>
          <IconSearch onClick={handleOpen} />
          <Modal
            open={open}
            title={"タグ検索"}
            tags={tags}
            handleClose={handleClose}
          />
          <a
            href="https://watataku-portfolio.web.app"
            target="_blank"
            rel="noreferrer"
            className={styles.about}
          >
            ABOUT
          </a>
        </nav>
      </div>
    </header>
  );
};
export default Header;
