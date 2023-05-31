import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { SITE_URL, returnTitle, returnDiscription } from "../../libs/const";
import type { Blog, BlogContents, Toc } from "../../types/blog";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";
import BlogList from "../../components/BlogList";
import MyNextSEO from "../../components/MyNextSEO";
import HeadLine from "../../components/HeadLine";
import SideBar from "../../components/SideBar";
import SNSShare from "../../components/SNSShare";
import ArticleBody from "../../components/ArticleBody";
import {
  datePlasticSurgery,
  getMicroCMSBlog,
  getMicroCMSBlogs,
} from "../../functions/function";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const blog: BlogContents = await getMicroCMSBlogs(999);

  const paths = blog.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const data: Blog = await getMicroCMSBlog(context.params?.id);

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

  const blog: BlogContents = await getMicroCMSBlogs(6);

  return {
    props: {
      blogs: blog.contents,
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
      <MyNextSEO
        title={returnTitle(blog.title)}
        description={returnDiscription(blog.body)}
        ogTitle={returnTitle(blog.title)}
        ogDescription={returnDiscription(blog.body)}
        ogType="article"
        ogUrl={blogUrl}
        ogImage={`${SITE_URL}/api/og?title=${
          blog.title
        }&postDate=${datePlasticSurgery(blog.publishedAt)}投稿`}
        ogSiteName={returnTitle(blog.title)}
        twCard="summary_large_image"
        twTitle={returnTitle(blog.title)}
        twDescription={returnDiscription(blog.body)}
        twImage={`${SITE_URL}/api/og?title=${
          blog.title
        }&postDate=${datePlasticSurgery(blog.publishedAt)}投稿`}
      />
      <div className="pt-14 pb-5">
        <HeadLine blog={blog} />

        <div className="flex justify-between m-auto w-[90%] maxsp:w-[96%] maxpc:flex-col">
          <SNSShare blogTitle={blog.title} blogUrl={blogUrl} />
          <ArticleBody highlightedBody={highlightedBody} />
          <SideBar blog={blog} toc={toc} />
        </div>

        <BlogList blogs={blogs} />
      </div>
    </>
  );
};
export default Detail;
