import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://watataku-portfolio.web.app"
        target="_blank"
        rel="noreferrer"
      >
        &copy;Watataku.
      </a>
    </footer>
  );
};
export default Footer;
