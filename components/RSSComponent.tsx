import RSSFeed from "../public/img/icon/icon_rss.svg";
import styles from "../styles/Share.module.css";

type Props = {
  url: string;
};

const RSSComponent = (props: Props) => {
  return (
    <p>
      <a href={props.url} target="_blank" className={styles.shareLink}>
        <RSSFeed />
      </a>
    </p>
  );
};
export default RSSComponent;
