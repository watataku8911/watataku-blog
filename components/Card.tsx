import Link from "next/link";
import styles from "../styles/Card.module.css";
import { split } from "../functions/function";

type Props = {
  id: string;
  thumbnail: string;
  title: string;
  body: string;
};

const Footer = (props: Props) => {
  return (
    <>
      <Link href={`/blog/${props.id}`}>
        <div className={styles.card}>
          <div className={styles.thumbnail}>
            <img src={props.thumbnail} />
          </div>
          <div className={styles.title}>
            <h2>{split(props.title, 20)}</h2>
          </div>
          <div className={styles.body}>
            <p>{split(props.body, 15)}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Footer;
