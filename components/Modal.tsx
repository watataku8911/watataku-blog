import Link from "next/link";
import { Tags } from "../types/blog";
import IconTag from "../public/img/icon_tag_navy.svg";
import React from "react";

type Props = {
  open: boolean;
  title: string;
  tags: Tags[];
  handleClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const Modal = React.memo((props: Props) => {
  if (!props.open) {
    return null;
  }

  return (
    <div
      className="bg-[rgba(0,_0,_0,_0.8)] fixed inset-0 w-full h-full z-[900] animate-open"
      onClick={props.handleClose}
    >
      <div className="rounded-xl text-center border border-black dark:border-white bg-white dark:bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] tbpc:w-[65%] maxsp:w-[95%] py-4">
        <h2 className="text-2xl font-bold mb-5 dark:text-white">
          {props.title}
        </h2>
        <div className="flex justify-around flex-wrap w-full">
          {props.tags.map((tag) => {
            return (
              <div
                key={tag.id}
                className="w-[30%] h-6 flex items-center justify-center"
              >
                <IconTag className="fill-white" />
                <Link href={`/search/${tag.id}/page/1`}>
                  <a className="text-blue-800 border-blue-800 dark:border-[#ff36ab] dark:text-[#ff36ab] hover:border-b">
                    {tag.tag_name}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Modal;
