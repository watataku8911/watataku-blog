import type { InferGetStaticPropsType, NextPage } from "next";
import type { BlogContents } from "../types/blog";
import { SITE_URL, returnTitle, returnDiscription } from "../libs/const";
import BlogList from "../components/BlogList";
import MyNextSEO from "../components/MyNextSEO";
import Pagination from "../components/Pagination";
import { getMicroCMSBlogs } from "../functions/function";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PER_PAGE = 9;

export const getStaticProps = async () => {
  const blog: BlogContents = await getMicroCMSBlogs(PER_PAGE);

  return {
    props: {
      blogs: blog.contents,
      totalCount: blog.totalCount,
    },
  };
};

const Home: NextPage<Props> = ({ blogs, totalCount }) => {
  return (
    <>
      <MyNextSEO
        title={returnTitle()}
        description={returnDiscription("Watatakuのブログです。")}
        ogTitle={returnTitle()}
        ogDescription={returnDiscription("Watatakuのブログです。")}
        ogType="blog"
        ogUrl={SITE_URL}
        ogImage={`${SITE_URL}/ogp.jpg`}
        ogSiteName={returnTitle()}
        twCard="summary_large_image"
        twTitle={returnTitle()}
        twDescription={returnDiscription("Watatakuのブログです。")}
        twImage={`${SITE_URL}/ogp.jpg`}
      />

      <BlogList blogs={blogs} />

      {totalCount >= PER_PAGE && <Pagination totalCount={totalCount} />}
    </>
  );
};

export default Home;
