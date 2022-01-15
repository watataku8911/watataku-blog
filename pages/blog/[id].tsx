import { client } from "../../seacretDirectory/seacret";

import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  NextPage,
} from "next";
import type { Blog, Tags } from "../../types/blog";

import styles from "../../styles/Detail.module.css";

import Link from "next/link";
import Head from "next/head";

import IconPublish from "../../public/img/icon/calendar.svg";
import IconRevise from "../../public/img/icon/refresh_update_icon.svg";
import IconTag from "../../public/img/icon/icon_tag_navy.svg";

import { datePlasticSurgery } from "../../functions/function";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const data: Blog = await client.get({
    endpoint: "blog",
    contentId: context.params?.id,
  });

  return {
    props: {
      blog: data,
    },
  };
};

const Detail: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.body} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.detail}>
        <section className={styles.detailHeader}>
          <img src={blog.thumbnail.url} width={100} height={80} />
          <h1 className={styles.detailTtl}>{blog.title}</h1>
          <div className={styles.dateArea}>
            <div className={styles.publishedAt}>
              <IconPublish />
              <time>{datePlasticSurgery(blog.publishedAt)}公開</time>
            </div>
            <div className={styles.revisedAt}>
              <IconRevise />
              <time>{datePlasticSurgery(blog.revisedAt)}更新</time>
            </div>
          </div>
        </section>

        <div className={styles.mainContents}>
          <section className={styles.detailContent}>
            <div dangerouslySetInnerHTML={{ __html: blog.body }} />
            <Link href="/">一覧へ戻る</Link>
          </section>

          <section className={styles.tagArea}>
            <h1>Tags</h1>
            <div className={styles.tagList}>
              {blog.tags.map((tag: Tags) => {
                return (
                  <div key={tag.id}>
                    <IconTag />
                    {tag.tag_name}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default Detail;
