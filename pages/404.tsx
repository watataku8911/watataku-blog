import Link from "next/link";
import Head from "next/head";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <section className="text-center min-h-[calc(100vh_-_170px)]">
        <h2 className="text-3xl font-bold mb-6">
          <span className="text-red-700 tracking-[5px] text-9xl mb-3">404</span>
          <br />
          お探しのページは見つかりませんでした。
        </h2>
        <p className="text-2xl mb-6 maxsp:text-base">
          あなたがアクセスしようとしたページは削除されたかURLが変更されているため、
          見つけることができません。
          <br />
          以下の理由が考えられます。
        </p>

        <ul className="p-5 mb-5 m-auto text-left border-4 border-gray-400 w-[55%] tbpc:w-[65%] maxsp:w-[85%]">
          <li className="list-disc maxsp:text-xs">
            記事がまだ公開されていない。
          </li>
          <li className="list-disc maxsp:text-xs">
            アクセスしようとしたファイルが存在しない。（ファイルの設置箇所を誤っている。）
          </li>
          <li className="list-disc maxsp:text-xs">URLが間違っている。</li>
        </ul>
        <Link href={"/"}>
          <a className="block text-blue-800 ml-auto pc:w-[15%] ">TOPへ戻る</a>
        </Link>
      </section>
    </>
  );
};
export default NotFound;
