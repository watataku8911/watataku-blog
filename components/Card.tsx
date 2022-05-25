import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Card.module.css";
import { datePlasticSurgery, split } from "../functions/function";
import type { Tags } from "../types/blog";
import IconTag from "../public/img/icon_tag_navy.svg";

type Props = {
  id: string;
  thumbnail: string;
  title: string;
  body: string;
  tags: Tags[];
  publishedAt: string;
};

const Card = (props: Props) => {
  return (
    <>
      <Link href={`/blog/${props.id}`} passHref>
        <div className={styles.card}>
          <div className={styles.thumbnail}>
            <Image
              src={props.thumbnail}
              unoptimized={true}
              width={350}
              height={200}
              objectFit={"cover"}
              alt={"サムネイル"}
            />
          </div>

          <div className={styles.title}>
            <h2>{split(props.title, 15)}</h2>
          </div>
          <div className={styles.tags}>
            {props.tags.map((tag: Tags) => {
              return (
                <div key={tag.id} className={styles.tag}>
                  <IconTag />
                  <span>{tag.tag_name}</span>
                </div>
              );
            })}
          </div>
          <p className={styles.publishedAt}>
            {datePlasticSurgery(props.publishedAt)}
          </p>
        </div>
      </Link>
    </>
  );
};
export default Card;
