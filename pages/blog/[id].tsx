import { client } from "../../seacretDirectory/seacret";
import type { Blog } from "../../types/blog";

import styles from "../../styles/Detail.module.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data: Blog = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
const Detail = ({ blog }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <img src={blog.thumbnail.url} width={100} height={80} />
        <h1>{blog.title}</h1>
        {/* <p>{blog.tags}</p> */}
        <p>{blog.body}</p>
      </main>
      <Footer />
    </>
  );
};
export default Detail;
