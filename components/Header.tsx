import { client } from "../seacretDirectory/seacret";
import styles from "../styles/Header.module.css";
import IconSearch from "../public/img/icon_search.svg";
import { useState, useCallback, useEffect } from "react";
import Modal from "./Modal";
import { TagsContents, Tags } from "../types/blog";
import Link from "next/link";

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
    const data: TagsContents = await client.get({
      endpoint: "tags",
      queries: {
        limit: 15,
      },
    });
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
      <div className={`${styles.headerContainer} ${styles.gred}`}>
        <h3>
          <Link href="/">Watataku&apos;s Blog</Link>
        </h3>
        <nav className={`${styles.navi} ${styles.gred}`}>
          <a className={`${styles.search} ${styles.gred}`}>
            <IconSearch onClick={handleOpen} />
          </a>
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
          >
            <p className={styles.about}>ABOUT</p>
          </a>
        </nav>
      </div>
    </header>
  );
};
export default Header;
