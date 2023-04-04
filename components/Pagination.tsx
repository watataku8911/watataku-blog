import Router from "next/router";
import Link from "next/link";
import styles from "../styles/Pagination.module.css";
import { range } from "../functions/function";

type Props = {
  totalCount: number;
  tag_id?: string;
};
const Pagination = (props: Props) => {
  const PER_PAGE = 9;

  return (
    <div className="flex justify-center mt-4">
      {range(1, Math.ceil(props.totalCount / PER_PAGE)).map((number, index) => (
        <p key={index} className="text-center list-none">
          {props.tag_id ? (
            <Link href={`/search/${props.tag_id}/page/${number}`}>
              <a className="mx-0.5 w-[30px] h-[40px] flex justify-center items-center text-2xl p-[2.5%] text-white bg-[#5bbee5] rounded-md hover:bg-blue-800">
                {number}
              </a>
            </Link>
          ) : (
            <Link href={`/page/${number}`}>
              <a className="mx-0.5 w-[30px] h-[40px] flex justify-center items-center text-2xl p-[2.5%] text-white bg-[#5bbee5] rounded-md hover:bg-blue-800">
                {number}
              </a>
            </Link>
          )}
        </p>
      ))}
    </div>
  );
};

export default Pagination;
