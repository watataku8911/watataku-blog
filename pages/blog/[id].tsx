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
import Card from "../../components/Card";

import styles from "../../styles/Detail.module.css";

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

import IconPublish from "../../public/img/icon_calendar.svg";
import IconRevise from "../../public/img/icon_refresh.svg";
import IconTag from "../../public/img/icon_tag_navy.svg";

import { datePlasticSurgery } from "../../functions/function";
import { SITE_URL, returnTitle, returnDiscription } from "../../libs/const";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const data: BlogContents = await client.get({
    endpoint: "blog",
    queries: {
      limit: 999,
    },
  });

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

  const $ = cheerio.load(data.body);

  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  const headings = $("h1, h2, h3, h4, H5").toArray();

  const toc = headings.map((data: any) => ({
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name,
  }));

  const dataList: BlogContents = await client.get({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
      limit: 6,
    },
  });

  return {
    props: {
      blogs: dataList.contents,
      blog: data,
      highlightedBody: $.html(),
      toc,
    },
  };
};

const Detail: NextPage<Props> = ({ blogs, blog, highlightedBody, toc }) => {
  const blogUrl = SITE_URL + "/" + blog.id;
  return (
    <>
      <Head>
        <title>{returnTitle(blog.title)}</title>
        <meta name="description" content={returnDiscription(blog.body)} />
        <link rel="icon" href="/favicon.ico" />

        <meta
          property="og:description"
          content={returnDiscription(blog.body)}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={blogUrl} />
        <meta property="og:image" content={blog.thumbnail.url} />
        <meta property="og:site_name" content={blog.title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={returnTitle(blog.title)} />
        <meta
          property="twitter:description"
          content={returnDiscription(blog.body)}
        />
        <meta name="twitter:image:src" content={blog.thumbnail.url} />
      </Head>

      <main className={styles.detail}>
        <section className={styles.detailHeader}>
          <p className={styles.thumbnail}>
            <Image
              src={blog.thumbnail.url}
              width={100}
              height={80}
              objectFit={"cover"}
              alt={"サムネイル"}
            />
          </p>
          <h1 className={styles.detailTtl}>{blog.title}</h1>
          <div className={styles.dateArea}>
            <div className={styles.publishedAt}>
              <IconPublish />
              <time>{datePlasticSurgery(blog.publishedAt)}に公開</time>
            </div>
            <div className={styles.revisedAt}>
              <IconRevise />
              <time>{datePlasticSurgery(blog.updatedAt)}に更新</time>
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
            <div dangerouslySetInnerHTML={{ __html: highlightedBody }} />
          </section>

          <div className={styles.sideBar}>
            <section className={styles.tagArea}>
              <h1>Tags</h1>
              <div className={styles.tagList}>
                {blog.tags.map((tag: Tags) => {
                  return (
                    <div key={tag.id} className={styles.tag}>
                      <IconTag />
                      <Link href={`/search/${tag.id}/page/1`}>
                        {tag.tag_name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className={styles.toc}>
              <h1>目次</h1>
              <div className={styles.tocList}>
                <ul id="lists" className={styles.lists}>
                  {toc.map((toc, index) => (
                    <li id={"list-" + toc.name} key={index}>
                      <div className={styles.listContents}>
                        <a href={"#" + toc.id}>{toc.text}</a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>

        <div className={styles.main}>
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
        </div>
      </main>
    </>
  );
};
export default Detail;
