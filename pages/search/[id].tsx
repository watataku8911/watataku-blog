import { client, GA_ID } from "../../seacretDirectory/seacret";

import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import type { BlogContents, Blog, Tags, TagsContents } from "../../types/blog";

import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Card from "../../components/Card";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSidePaths = async () => {
  const data: TagsContents = await client.get({ endpoint: "tags" });

  const paths = data.contents.map((content: Tags) => `/search/${content.id}`);
  return { paths, fallback: false };
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const id = context.params?.id;

  const data: BlogContents = await client.get({
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

const Search: NextPage<Props> = ({ blogs }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{blogs.id}</title>
        <link rel="icon" href="/favicon.ico" />

        {/* Google Analytics  */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
        `,
          }}
        />
      </Head>

      {blogs.data.contents.length == 0 ? (
        <main className={styles.main}>
          <h2>このタグが付いている記事はありません。</h2>
        </main>
      ) : (
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
      )}
    </div>
  );
};

export default Search;
