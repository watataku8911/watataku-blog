import type {
  InferGetStaticPropsType,
  NextPage,
  GetStaticPropsContext,
} from "next";
import type { BlogContents } from "../../types/blog";
import Pagination from "../../components/Pagination";
import { returnTitle, returnDiscription, SITE_URL } from "../../libs/const";
import { getMicroCMSBlogs, range } from "../../functions/function";
import BlogList from "../../components/BlogList";
import MyNextSEO from "../../components/MyNextSEO";

const PER_PAGE = 9;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const blog: BlogContents = await getMicroCMSBlogs();

  const paths = range(1, Math.ceil(blog.totalCount / PER_PAGE)).map(
    (repo) => `/page/${repo}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const pageNo = Number(context.params?.id);
  let blog: BlogContents;
  blog = await getMicroCMSBlogs(PER_PAGE, (pageNo - 1) * PER_PAGE);

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
      <main className="min-h-[calc(100vh_-_170px)]">
        <BlogList blogs={blogs} />
        {totalCount > PER_PAGE && <Pagination totalCount={totalCount} />}
      </main>
    </>
  );
};

export default Home;
