import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/About.module.css";

const About: NextPage = () => {
  return (
    <main className={styles.mainContents}>
      <Head>
        <title>ABOUT</title>
      </Head>
      <h1>About this Blog</h1>
      <div className={styles.thumbnail}>
        <Image
          src={"/Hight_icon_watataku's_radius.png"}
          width={200}
          height={200}
        />
      </div>
      <div>
        <p>
          このブログは「Watataku」が運営しているブログです。
          <br />
          主にモダンフロントエンドに関する技術記事を投稿しています。
        </p>
      </div>
      <a
        href="https://watataku-portfolio.web.app"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        ポートフォリオ→
      </a>
    </main>
  );
};
export default About;
