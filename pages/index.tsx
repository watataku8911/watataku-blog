import { client } from "../seacretDirectory/seacret";

import type { InferGetStaticPropsType, NextPage } from "next";
import type { BlogContents, Blog } from "../types/blog";

import styles from "../styles/Home.module.css";
import Head from "next/head";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

import { SITE_URL, returnTitle, returnDiscription } from "../libs/const";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PER_PAGE = 9;

export const getStaticProps = async () => {
  const data: BlogContents = await client.get({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
      limit: PER_PAGE,
    },
  });

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};

const Home: NextPage<Props> = ({ blogs, totalCount }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{returnTitle()}</title>
        <meta
          name="description"
          content={returnDiscription("Watataku's ブログです。")}
        />
        <link rel="icon" href="/favicon.ico" />

        <meta
          property="og:description"
          content={returnDiscription("Watataku's ブログです。")}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta
          property="og:image"
          content="https://watataku-portfolio.web.app/img/Hight_main.67495da6.jpeg"
        />
        <meta property="og:site_name" content={returnTitle()} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={returnTitle()} />
        <meta
          property="twitter:description"
          content={returnDiscription("Watataku's ブログです。")}
        />
        <meta
          name="twitter:image:src"
          content="https://watataku-portfolio.web.app/img/Hight_main.67495da6.jpeg"
        />
      </Head>

      <div className={styles.wrapper}>
        <main className={styles.main}>
          {blogs.map((blog: Blog) => {
            return (
              <Card
                id={blog.id}
                thumbnail={blog.thumbnail.url}
                title={blog.title}
                tags={blog.tags}
                publishedAt={blog.publishedAt}
                key={blog.id}
              />
            );
          })}
        </main>
        {totalCount >= PER_PAGE && <Pagination totalCount={totalCount} />}
      </div>
    </div>
  );
};

export default Home;
