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

const Modal = (props: Props) => {
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
        <ul className="text-left grid grid-cols-3 maxsp:grid-cols-2 ">
          {props.tags.map((tag) => {
            return (
              <li
                key={tag.id}
                className="flex items-center gap-1 justify-center"
              >
                <IconTag className="fill-white" />
                <Link
                  className="inline-block text-blue-800 border-blue-800 dark:border-[#ff36ab] dark:text-[#ff36ab] hover:border-b"
                  href={`/search/${tag.id}/page/1`}
                >
                  {tag.tag_name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
