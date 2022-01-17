import { client } from "../../seacretDirectory/seacret";

import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  NextPage,
} from "next";
import type { Contents, Blog, Tags } from "../../types/blog";

import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Card from "../../components/Card";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "tags" });

  const paths = data.contents.map((content: Tags) => `/search/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const id = context.params?.id;

  const data: Contents = await client.get({
    endpoint: "blog",
    queries: { filters: "tags[contains]" + id },
  });

  return {
    props: {
      blogs: {
        data,
        id,
      },
    },
  };
};

const Home: NextPage<Props> = ({ blogs }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{blogs.id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {blogs.data.contents.map((blog: Blog) => {
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
