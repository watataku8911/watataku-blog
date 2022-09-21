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
  tags: Tags[];
  publishedAt: string;
};

const Card = (props: Props) => {
  return (
    <>
      <Link href={`/blog/${props.id}`} passHref>
        <article className={styles.card}>
          <div className={styles.thumbnail}>
            <Image
              src={props.thumbnail}
              unoptimized={true}
              width={350}
              height={200}
              layout={"responsive"}
              objectFit={"cover"}
              alt={"サムネイル"}
            />
          </div>

          <div className={styles.title}>
            <h2>{split(props.title, 40)}</h2>
          </div>

          <ul className={styles.tags}>
            {props.tags.map((tag: Tags) => {
              return (
                <li key={tag.id} className={styles.tag}>
                  <IconTag />
                  {tag.tag_name}
                </li>
              );
            })}
          </ul>

          <time datatype={props.publishedAt} className={styles.publishedAt}>
            {datePlasticSurgery(props.publishedAt)}
          </time>
        </article>
      </Link>
    </>
  );
};
export default Card;
