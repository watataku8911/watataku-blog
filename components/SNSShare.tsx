import React from "react";
import TwitterShare from "./TwitterShare";
import FacebookShare from "./FacebookShare";

type Props = {
  blogTitle: string;
  blogUrl: string;
};

const SNSShare = (props: Props) => {
  return (
    <section className="flex flex-col items-center w-2.5 h-24 sticky top-0 gap-5 maxpc:flex-row maxpc:order-3">
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
