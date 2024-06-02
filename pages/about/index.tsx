import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import MyNextSEO from "../../components/MyNextSEO";
import { SITE_URL, returnDiscription, returnTitle } from "../../libs/const";

const About: NextPage = () => {
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
      <main className="min-h-[calc(100vh_-_200px)]">
        <Image
          className="w-40 aspect-square my-6 m-auto"
          width={400}
          height={400}
          loading="eager"
          priority
          alt=""
          src={"/Hight_icon_watataku's_radius.png"}
        />
        <p className="text-3xl font-bold text-center dark:text-white mb-4">
          Watataku
        </p>
        <div className="dark:text-white max-w-3xl m-auto">
          <p>
            1996年大阪府生まれ。Web/ITの専門学校にて、ITとはなんぞや？を学んだ後、新卒でSIerに入社。
            その後、色々な事があり、現在はSNSや技術ブログを通して情報発信しながらマークアップエンジニア/フロントエンドエンジニアとして活動中.
          </p>
          <div className="h-4"></div>
          <p>
            I was born in Osaka,Japan in 1996, Learned about &quot;what is
            IT?&quot; by tvocational school.After,Worked &quot;SIer&quot; at new
            graduate in 2019, But I was diagonsed in called intractable disease
            &quot;SCD&quot; in 2019.Now,Currently working as a markup
            developer/frontend developer while transmitting information through
            SNS and blogs.I hope you enjoy the site.
          </p>
          <div className="h-8"></div>
          <Link href={"/"}>記事一覧へ戻る</Link>
        </div>
      </main>
    </>
  );
};
export default About;
