import Link from "next/link";
import Image from "next/legacy/image";
import { datePlasticSurgery } from "../functions/function";
import type { Tags } from "../types/blog";
import IconTag from "../public/img/icon_tag_navy.svg";

type Props = {
  id: string;
  thumbnail: string;
  title: string;
  tags: Tags[];
  publishedAt: string;
};

const Card = (props: Props) => {
  return (
    <li className="relative mb-2.5 mt-3.5 shadow-xl bg-white w-[350px] h-[380px] tbpc:w-[30vw] tbpc:h-[310px] maxsp:w-[95%] dark:shadow-outline dark:bg-black hover:translate-x-0 hover:translate-y-1.5">
      <Link href={`/blog/${props.id}`} passHref>
        <div className="border-solid border-8 border-[#ccc] dark:border-[#333]">
          <Image
            src={props.thumbnail}
            unoptimized={true}
            width={350}
            height={200}
            layout={"responsive"}
            objectFit={"cover"}
            alt={"サムネイル"}
          />
        </div>

        <h2 className="pt-3 pr-3 pl-3 text-lg font-medium overflow-hidden webkit-line-clamp dark:text-white">
          {props.title}
        </h2>

        <ul className="flex flex-start flex-wrap mt-1">
          {props.tags.map((tag: Tags) => {
            return (
              <li
                key={tag.id}
                className="tbpc:text-sm flex justify-center items-center p-0.5 border-solid border-2 ml-2 tbpc:ml-1 mb-2 tbpc:mb-1 border-[#5bbee5] dark:border-[#7388c0] dark:text-white"
              >
                <IconTag className="dark:fill-[#fff]" />
                {tag.tag_name}
              </li>
            );
          })}
        </ul>

        <time
          datatype={props.publishedAt}
          className="absolute bottom-[5px] right-[5px] dark:text-white"
        >
          {datePlasticSurgery(props.publishedAt)}
        </time>
      </Link>
    </li>
  );
};
export default Card;
