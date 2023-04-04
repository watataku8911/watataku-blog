import Link from "next/link";
import Image from "next/image";
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
    <>
      <Link href={`/blog/${props.id}`} passHref>
        <article className="relative w-[350px] h-[380px] mb-2.5 mt-3.5 bg-white cursor-pointer shadow-xl tbpc:w-[30vw] tbpc:h-[310px] hover:translate-x-0 hover:translate-y-1.5">
          <div className="border-solid border-[#ccc] border-8">
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

          <h2 className="pt-3 pr-3 pl-3 text-lg font-medium overflow-hidden webkit-line-clamp">
            {props.title}
          </h2>

          <ul className="flex flex-start flex-wrap mt-1">
            {props.tags.map((tag: Tags) => {
              return (
                <li
                  key={tag.id}
                  className="flex justify-center items-center p-0.5 border-solid border-[#5bbee5] border-2 ml-2 mb-2"
                >
                  <IconTag />
                  {tag.tag_name}
                </li>
              );
            })}
          </ul>

          <time
            datatype={props.publishedAt}
            className="absolute bottom-[5px] right-[5px]"
          >
            {datePlasticSurgery(props.publishedAt)}
          </time>
        </article>
      </Link>
    </>
  );
};
export default Card;
