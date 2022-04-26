import { client } from "../../seacretDirectory/seacret";

import type {
  InferGetStaticPropsType,
  NextPage,
  GetStaticPropsContext,
} from "next";
import type { BlogContents, Blog } from "../../types/blog";

import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";

import { returnTitle } from "../../libs/const";
import { range } from "../../functions/function";

const PER_PAGE = 9;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const data: BlogContents = await client.get({
    endpoint: "blog",
  });

  const paths = range(1, Math.ceil(data.totalCount / PER_PAGE)).map(
    (repo) => `/page/${repo}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const pageNo = Number(context.params?.id);
  let data: BlogContents;
  data = await client.get({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
      offset: (pageNo - 1) * PER_PAGE,
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} id="main">
        {blogs.map((blog: Blog) => {
          return (
            <Card
              id={blog.id}
              thumbnail={blog.thumbnail.url}
              title={blog.title}
              body={blog.body}
              tags={blog.tags}
              publishedAt={blog.publishedAt}
              key={blog.id}
            />
          );
        })}
      </main>

      {totalCount >= PER_PAGE && <Pagination totalCount={totalCount} />}
    </div>
  );
};

export default Home;
