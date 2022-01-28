import Link from "next/link";
import Head from "next/head";
import styles from "../styles/404.module.css";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <section className={styles.errorPage}>
        <h2>
          <span>404</span>
          <br />
          お探しのページは見つかりませんでした。
        </h2>
        <p>
          あなたがアクセスしようとしたページは削除されたかURLが変更されているため、
          見つけることができません。
          <br />
          以下の理由が考えられます。
        </p>

        <ul>
          <li>記事がまだ公開されていない。</li>
          <li>
            アクセスしようとしたファイルが存在しない。（ファイルの設置箇所を誤っている。）
          </li>
          <li>URLが間違っている。</li>
        </ul>
        <Link href={"/"}>TOPへ戻る</Link>
      </section>
    </>
  );
};
export default NotFound;
