import React from "react";

type Props = {
  highlightedBody: string;
};
const ArticleBody = (props: Props) => {
  return (
    <section className="markdown rounded-3xl bg-white dark:bg-black w-[60%] p-[1%] maxpc:w-full maxpc:order-2 maxpc:rounded-t-none">
      <div dangerouslySetInnerHTML={{ __html: props.highlightedBody }} />
    </section>
  );
};

export default ArticleBody;
