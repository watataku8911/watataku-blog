//import Image from "next/image";
import styles from "../styles/Card.module.css";

type Props = {
  thumbnail: string;
  title: string;
  body: string;
};

const Footer = (props: Props) => {
  const split = (body: string, maxLength: number): string => {
    let modStr = "・・・";

    if (body.length > maxLength) {
      modStr = body.substr(0, maxLength) + "...";
    }
    return modStr;
  };
  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        {props.thumbnail}
        {/* <Image src={props.thumbnail} /> */}
      </div>
      <div className={styles.title}>
        <h2>{props.title}</h2>
      </div>
      <div className={styles.body}>
        <p>{split(props.body, 10)}</p>
      </div>
    </div>
  );
};
export default Footer;
