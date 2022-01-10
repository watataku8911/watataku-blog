import Link from "next/link";
import styles from "../styles/Header.module.css";

const Footer = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link href={"/"}>Watataku's ブログ</Link>
        <a href="https://watataku-portfolio.web.app" target="_blank">
          <img
            src="../img/Hight_icon_watataku's_radius.png"
            width="50"
            height="50"
          />
        </a>
      </div>
    </header>
  );
};
export default Footer;
