import Image from "next/image";
import Head from "next/head";
import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  NextPage,
} from "next";

import { client } from "../../seacretDirectory/seacret";
import { datePlasticSurgery } from "../../functions/function";
import { SITE_URL, returnTitle, returnDiscription } from "../../libs/const";

import type { Blog, BlogContents, Toc } from "../../types/blog";

import TwitterShare from "../../components/TwitterShare";
import FacebookShare from "../../components/FacebookShare";
import Card from "../../components/Card";
import TagList from "../../components/TagList";
import TableOfContents from "../../components/TableOfContents";
import IconPublish from "../../public/img/icon_calendar.svg";
import IconRevise from "../../public/img/icon_refresh.svg";

import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

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

  const toc: Toc[] = headings.map((data: any) => ({
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name,
  }));

  console.log(toc);

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
  const blogUrl = SITE_URL + "/blog/" + blog.id;
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

      <main className="pt-14 pb-5">
        <section className="mb-5 text-center">
          <p className="w-[100px] h-[80.6px] border border-black m-auto">
            <Image
              src={blog.thumbnail.url}
              width={100}
              height={80}
              layout={"responsive"}
              objectFit={"cover"}
              alt={"サムネイル"}
            />
          </p>
          <h1 className="my-4 font-bold text-4xl maxsp:text-xl">
            {blog.title}
          </h1>
          <div className="m-auto flex justify-between items-center text-gray-600 w-[700px] tbpc:w-[550px] maxsp:w-[98%]">
            <div className="flex items-center gap-2.5 tbpc:gap-4 maxsp:gap-0.5 maxsp:text-xs">
              <IconPublish />
              <time datatype={blog.publishedAt}>
                {datePlasticSurgery(blog.publishedAt)}に公開
              </time>
            </div>
            <div className="flex items-center gap-2.5 tbpc:gap-4 maxsp:gap-0.5 maxsp:text-xs">
              <IconRevise />
              <time datatype={blog.updatedAt}>
                {datePlasticSurgery(blog.updatedAt)}に更新
              </time>
            </div>
          </div>
        </section>

        <div className="flex justify-between m-auto w-[90%] maxpc:w-[95% maxpc:flex-col">
          <section className="flex flex-col items-center w-2.5 h-24 sticky top-0 gap-5 maxpc:flex-row maxpc:order-3">
            <TwitterShare
              url={
                "https://twitter.com/share?text=" +
                blog.title +
                "&url=" + blogUrl
              }
            />
            <FacebookShare
              url={
                "http://www.facebook.com/share.php?u=" + blogUrl
              }
            />
          </section>

          <section className="markdown rounded-3xl bg-white w-[60%] p-[1%] maxpc:w-full maxpc:order-2 maxpc:rounded-t-none">
            <div dangerouslySetInnerHTML={{ __html: highlightedBody }} />
          </section>

          <section className="pc:w-80 pc:h-96 pc:sticky pc:top-0">
            <div className="bg-white overflow-auto p-4 h-24 maxpc:h-auto pc:mb-5 rounded-3xl maxpc:order-1 maxpc:rounded-b-none">
              <TagList blog={blog} />
            </div>

            <div className="bg-white overflow-auto p-4 rounded-3xl h-64 maxpc:h-auto maxpc:order-1 maxpc:rounded-none">
              <h2 className="text-2xl font-bold mb-4 ">目次</h2>
              <TableOfContents toc={toc} />
            </div>
          </section>
        </div>

        <div className="w-[1100px] tbpc:w-[95%] maxsp:w-[100%] m-auto flex flex-wrap justify-between maxsp:justify-center">
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
        </div>
      </main>
    </>
  );
};
export default Detail;
