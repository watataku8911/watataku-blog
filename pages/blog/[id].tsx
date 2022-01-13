import { client } from "../../seacretDirectory/seacret";

import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  NextPage,
} from "next";
import type { Blog, Tags } from "../../types/blog";

import styles from "../../styles/Detail.module.css";
//import IconPublish from "../img/icon/weekly-calendar-outline-event-interface-symbol_icon-icons.com_73108.svg";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

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
  const datePlasticSurgery = (date: string): string => {
    const newDate = date.slice(0, -14);
    const arrayDate = newDate.split("-");
    return arrayDate[0] + "年" + arrayDate[1] + "月" + arrayDate[2] + "日";
  };

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
              {/* <IconPublish /> */}
              <img
                src={
                  "../img/icon/weekly-calendar-outline-event-interface-symbol_icon-icons.com_73108.svg"
                }
              />
              <time>{datePlasticSurgery(blog.publishedAt)}公開</time>
            </div>
            <div className={styles.revisedAt}>
              <img src={"../img/icon/refresh_update_icon_142975.svg"} />
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
            <h4>Tags</h4>
            <ul>
              {blog.tags.map((tag: Tags) => {
                return <li key={tag.id}>{tag.tag_name}</li>;
              })}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};
export default Detail;
