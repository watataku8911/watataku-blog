import React from "react";
import TwitterShare from "./TwitterShare";
import FacebookShare from "./FacebookShare";

type Props = {
  blogTitle: string;
  blogUrl: string;
};

const SNSShare = (props: Props) => {
  return (
    <section className="flex flex-col gap-y-8  maxpc:gap-x-5 maxpc:justify-center maxpc:flex-row maxpc:mb-4 pc:sticky pc:top-10 pc:h-32 ">
      <TwitterShare
        url={
          "https://twitter.com/share?text=" +
          props.blogTitle +
          "&url=" +
          props.blogUrl
        }
      />
      <FacebookShare
        url={"http://www.facebook.com/share.php?u=" + props.blogUrl}
      />
    </section>
  );
};

export default SNSShare;
