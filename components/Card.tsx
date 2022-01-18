import Link from "next/link";
import Image from "next/image";
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
      <Link href={`/blog/${props.id}`} passHref>
        <div className={styles.card}>
          <div className={styles.thumbnail}>
            <Image
              src={props.thumbnail}
              width={248}
              height={200}
              alt={"サムネイル"}
            />
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
