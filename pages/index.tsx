import { client } from "../seacretDirectory/seacret";

import type { InferGetStaticPropsType, NextPage } from "next";
import type { Contents, Blog } from "../types/blog";

import styles from "../styles/Home.module.css";
import Head from "next/head";
import Card from "../components/Card";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const data: Contents = await client.get({ endpoint: "blog" });

  return {
    props: {
      blogs: data.contents,
    },
  };
};

const Home: NextPage<Props> = ({ blogs }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Watataku's ブログ</title>
        <meta name="description" content="Watataku's ブログです。" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:description" content="Watataku's ブログです。" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://watataku-portfolio.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://watataku-portfolio.web.app/img/Hight_main.67495da6.jpeg"
        />
        <meta property="og:site_name" content="Watataku’s ブログ" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Watataku’s ブログ" />
        <meta
          property="twitter:description"
          content="Watataku's ブログです。"
        />
        <meta
          name="twitter:image:src"
          content="https://watataku-portfolio.web.app/img/Hight_main.67495da6.jpeg"
        />
      </Head>

      <main className={styles.main}>
        {blogs.map((blog: Blog) => {
          return (
            <Card
              id={blog.id}
              thumbnail={blog.thumbnail.url}
              title={blog.title}
              body={blog.body}
              key={blog.id}
            />
          );
        })}
      </main>
    </div>
  );
};

export default Home;
