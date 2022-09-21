import Head from "next/head";
import { client } from "../../../../seacretDirectory/seacret";
import styles from "../../../../styles/Home.module.css";
import Card from "../../../../components/Card";
import Pagination from "../../../../components/Pagination";
import { returnTitle } from "../../../../libs/const";
import { range } from "../../../../functions/function";
import type {
  InferGetStaticPropsType,
  NextPage,
  GetStaticPropsContext,
} from "next";
import type { BlogContents, Blog, TagsContents } from "../../../../types/blog";

const PER_PAGE = 9;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const data: BlogContents = await client.get({
    endpoint: "blog",
  });
  const tagData: TagsContents = await client.get({
    endpoint: "tags",
    queries: {
      limit: 15,
    },
  });

  const paths = tagData.contents.map((tag) => {
    return {
      params: {
        tag_id: tag.id,
        id: "1",
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ tag_id: string; id: string }>
) => {
  const tagId = context.params?.tag_id;
  const pageNo = Number(context.params?.id);

  let blogData: BlogContents;
  blogData = await client.get({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
      filters: "tags[contains]" + tagId,
      offset: (pageNo - 1) * PER_PAGE,
      limit: PER_PAGE,
    },
  });

  return {
    props: {
      tagId,
      blogs: blogData.contents,
      totalCount: blogData.totalCount,
    },
  };
};

const Home: NextPage<Props> = ({ tagId, blogs, totalCount }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{returnTitle(tagId)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {blogs.length == 0 ? (
        <main className={styles.main}>
          <h2>このタグが付いている記事はありません。</h2>
        </main>
      ) : (
        <main className={styles.main} id="main">
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
          {totalCount >= PER_PAGE && (
            <Pagination totalCount={totalCount} tag_id={tagId} />
          )}
        </main>
      )}
    </div>
  );
};

export default Home;
