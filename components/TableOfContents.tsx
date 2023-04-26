import React from "react";
import type { Toc } from "../types/blog";
type Props = {
  toc: Toc[];
};
const TableOfContants = (props: Props) => {
  return (
    <>
      <ul className="pl-[8%]">
        {props.toc.map((toc, index) => (
          <li id={toc.name} className="dark:text-white" key={index}>
            <a href={"#" + toc.id}>{toc.text}</a>
          </li>
        ))}
      </ul>
      <style jsx>{`
        #h1 {
          font-size: 1.2em;
          list-style: square;
        }

        #h2 {
          font-size: 1em;
          margin-left: 15px;
          list-style: square;
        }

        #h3 {
          font-size: 0.8em;
          list-style: square;
          margin-left: 25px;
        }

        #h4 {
          font-size: 0.8em;
          list-style: square;
          margin-left: 35px;
        }

        #h5 {
          font-size: 0.8em;
          list-style: square;
          margin-left: 45px;
        }
      `}</style>
    </>
  );
};
export default TableOfContants;
