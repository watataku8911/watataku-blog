import FacebookSvg from "../public/img/icon_facebook.svg";
import styles from "../styles/Share.module.css";

type Props = {
  url: string;
};

const TwitterShare = (props: Props) => {
  return (
    <p>
      <a
        href={props.url}
        target="_blank"
        rel="noreferrer"
        className={styles.shareLink}
      >
        <FacebookSvg />
      </a>
    </p>
  );
};
export default TwitterShare;
