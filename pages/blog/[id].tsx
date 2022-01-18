import { client } from "../../seacretDirectory/seacret";

import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  NextPage,
} from "next";
import type { Blog, BlogContents, Tags } from "../../types/blog";

import TwitterShare from "../../components/TwitterShare";
import FacebookShare from "../../components/FacebookShare";
// import RSSComponent from "../../components/RSSComponent";

import styles from "../../styles/Detail.module.css";

import Link from "next/link";
import Head from "next/head";

import IconPublish from "../../public/img/icon_calendar.svg";
import IconRevise from "../../public/img/icon_refresh.svg";
import IconTag from "../../public/img/icon_tag_navy.svg";

import { datePlasticSurgery } from "../../functions/function";
import { SITE_URL } from "../../libs/const";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const data: BlogContents = await client.get({ endpoint: "blog" });

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

        <meta property="og:description" content={blog.body} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://watataku-blog.vercel.app/" />
        <meta property="og:image" content={blog.thumbnail.url} />
        <meta property="og:site_name" content={blog.title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta property="twitter:description" content={blog.body} />
        <meta name="twitter:image:src" content={blog.thumbnail.url} />
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
              <time>{datePlasticSurgery(blog.updatedAt)}更新</time>
            </div>
          </div>
        </section>

        <div className={styles.mainContents}>
          <section className={styles.snsArea}>
            <TwitterShare
              url={
                "https://twitter.com/share?text=" +
                blog.title +
                "&url=" +
                SITE_URL +
                "/blog/" +
                blog.id
              }
            />
            <FacebookShare
              url={
                "http://www.facebook.com/share.php?u=" +
                SITE_URL +
                "/blog/" +
                blog.id
              }
            />
            {/* <RSSComponent url={"/feed"} /> */}
          </section>

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
                    <Link href={`/search/${tag.id}`}>{tag.tag_name}</Link>
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
