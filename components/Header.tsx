import Link from "next/link";
import styles from "../styles/Header.module.css";

const Footer = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link href={"/"}>Watataku's Blog</Link>
        <a href="https://watataku-portfolio.web.app" target="_blank">
          <img
            src="../img/Hight_icon_watataku's_radius.png"
            width="45"
            height="45"
          />
        </a>
      </div>
    </header>
  );
};
export default Footer;
