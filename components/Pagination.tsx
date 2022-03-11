import Router from "next/router";
import Link from "next/link";
import styles from "../styles/Pagination.module.css";
import { range } from "../functions/function";

type Props = {
  totalCount: number;
  tag_id?: string;
};
const Pagination = (props: Props) => {
  const PER_PAGE = 15;

  return (
    <div className={styles.pagination}>
      {range(1, Math.ceil(props.totalCount / PER_PAGE)).map((number, index) => (
        <p key={index}>
          {props.tag_id ? (
            <Link href={`/search/${props.tag_id}/page/${number}/#main`}>
              <a>{number}</a>
            </Link>
          ) : (
            <>
              <Link href={`/page/${number}/#main`}>
                <a>{number}</a>
              </Link>
            </>
          )}
        </p>
      ))}
    </div>
  );
};

export default Pagination;
