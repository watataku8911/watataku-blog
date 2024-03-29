import {
  returnTitle,
  returnDiscription,
  SITE_URL,
} from "../../../../libs/const";
import {
  genalateTitleTag,
  getMicroCMSBlogs,
  getMicroCMSTag,
  range,
} from "../../../../functions/function";
import type {
  InferGetStaticPropsType,
  NextPage,
  GetStaticPropsContext,
} from "next";
import type { BlogContents, TagsContents } from "../../../../types/blog";
import BlogList from "../../../../components/BlogList";
import MyNextSEO from "../../../../components/MyNextSEO";
import Pagination from "../../../../components/Pagination";

const PER_PAGE = 9;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const tags: TagsContents = await getMicroCMSTag();

  const blog: BlogContents = await getMicroCMSBlogs();

  const categoryParams = tags.contents.flatMap((tag) =>
    range(1, Math.ceil(blog.totalCount / PER_PAGE)).map((number) => ({
      params: {
        tag_id: tag.id,
        id: number.toString(),
      },
    }))
  );

  return {
    paths: categoryParams,
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ tag_id: string; id: string }>
) => {
  const tagId = context.params?.tag_id;
  const pageNo = Number(context.params?.id);

  let blog: BlogContents;
  blog = await getMicroCMSBlogs(
    PER_PAGE,
    (pageNo - 1) * PER_PAGE,
    "tags[contains]" + tagId
  );

  const tagName = await genalateTitleTag(tagId);

  return {
    props: {
      tagName,
      tagId,
      blogs: blog.contents,
      totalCount: blog.totalCount,
    },
  };
};

const Home: NextPage<Props> = ({ tagName, tagId, blogs, totalCount }) => {
  return (
    <>
      <MyNextSEO
        title={returnTitle(`${tagName}の記事一覧`)}
        description={returnDiscription("Watatakuのブログです。")}
        ogTitle={returnTitle(`${tagName}の記事一覧`)}
        ogDescription={returnDiscription("Watatakuのブログです。")}
        ogType="blog"
        ogUrl={SITE_URL}
        ogImage={`${SITE_URL}/ogp.jpg`}
        ogSiteName={returnTitle(`${tagName}の記事一覧`)}
        twCard="summary_large_image"
        twTitle={returnTitle(`${tagName}の記事一覧`)}
        twDescription={returnDiscription("Watatakuのブログです。")}
        twImage={`${SITE_URL}/ogp.jpg`}
      />

      {blogs.length == 0 ? (
        <main className="w-[1100px] tbpc:w-[95%] maxsp:w-[100%] min-h-[calc(100vh_-_170px)] m-auto flex flex-wrap justify-center items-center">
          <h2 className="text-4xl dark:text-white maxsp:text-lg">
            &quot;{tagName}&quot;&nbsp;に関する記事はまだありません。
          </h2>
        </main>
      ) : (
        <main className="min-h-[calc(100vh_-_170px)]">
          <BlogList blogs={blogs} />
          {totalCount > PER_PAGE && (
            <Pagination totalCount={totalCount} tag_id={tagId} />
          )}
        </main>
      )}
    </>
  );
};

export default Home;
