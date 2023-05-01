import Link from "next/link";
import Head from "next/head";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <section className="text-center min-h-[calc(100vh_-_170px)]">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">
          <span className="text-red-700 tracking-[5px] text-9xl maxsp:text-8xl mb-4">
            404
          </span>
          <br />
          お探しのページは見つかりませんでした。
        </h2>
        <p className="text-xl mb-8 maxsp:text-base dark:text-white">
          あなたがアクセスしようとしたページは削除されたかURLが変更されているため、
          見つけることができません。
          <br />
          以下の理由が考えられます。
        </p>

        <ul className="p-5 mb-6 m-auto text-left border-4 border-gray-400 dark:border-gray-50 w-[55%] tbpc:w-[65%] maxsp:w-[85%] dark:text-white">
          <li className="list-disc ml-5 maxsp:text-xs">
            記事がまだ公開されていない。
          </li>
          <li className="list-disc ml-5 maxsp:text-xs">
            アクセスしようとしたファイルが存在しない。（ファイルの設置箇所を誤っている。）
          </li>
          <li className="list-disc ml-5 maxsp:text-xs">URLが間違っている。</li>
        </ul>
        <div className="w-[90%] text-right">
          <Link href={"/"}>
            <a className=" text-blue-800 border-b-blue-800 dark:border-[#ff36ab] dark:text-[#ff36ab] hover:border-b ml-auto">
              TOPへ戻る
            </a>
          </Link>
        </div>
      </section>
    </>
  );
};
export default NotFound;
