import Link from "next/link";
import styles from "../styles/Header.module.css";
import IconSearch from "../public/img/icon_search.svg";
import IconGithub from "../public/img/icon_github.svg";

const Footer = () => {
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
          <IconSearch />
        </nav>
      </div>
    </header>
  );
};
export default Footer;
