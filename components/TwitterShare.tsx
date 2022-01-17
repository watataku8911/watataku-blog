import TwitterSvg from "../public/img/icon_twitter.svg";
import styles from "../styles/Share.module.css";

type Props = {
  url: string;
};

const TwitterShare = (props: Props) => {
  return (
    <p>
      <a href={props.url} target="_blank" className={styles.shareLink}>
        <TwitterSvg />
      </a>
    </p>
  );
};
export default TwitterShare;
