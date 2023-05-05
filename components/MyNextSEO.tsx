import Head from "next/head";
import React from "react";

type Props = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: "website" | "blog" | "article" | "product";
  ogUrl: string;
  ogImage: string;
  ogSiteName: string;
  twCard: "summary" | "summary_large_image" | "app" | "player";
  twTitle: string;
  twDescription: string;
  twImage: string;
};

const MyNextSEO = (props: Props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />

      {/* OGP */}
      <meta property="og:title" content={props.ogTitle} />
      <meta property="og:description" content={props.ogDescription} />
      <meta property="og:type" content={props.ogType} />
      <meta property="og:url" content={props.ogUrl} />
      <meta property="og:image" content={props.ogImage} />
      <meta property="og:site_name" content={props.ogSiteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={props.twCard} />
      <meta name="twitter:title" content={props.twTitle} />
      <meta property="twitter:description" content={props.twDescription} />
      <meta name="twitter:image:src" content={props.twImage} />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MyNextSEO;
