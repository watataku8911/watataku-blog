import Link from "next/link";
import { Tags } from "../types/blog";
import IconTag from "../public/img/icon_tag_navy.svg";

type Props = {
  open: boolean;
  title: string;
  tags: Tags[];
  handleClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const Modal = (props: Props) => {
  return (
    <>
      {props.open && (
        <div
          className="bg-[rgba(0,_0,_0,_0.8)] fixed inset-0 w-full h-full z-[900] animate-open"
          onClick={props.handleClose}
        >
          <div className="rounded-xl p-10 text-center bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] tbpc:w-[65%] maxsp:w-[95%]">
            <h2 className="text-2xl font-bold mb-8">{props.title}</h2>

            <div className="flex justify-center flex-wrap">
              {props.tags.map((tag) => {
                return (
                  <div
                    key={tag.id}
                    className="w-[30%] flex items-center justify-center"
                  >
                    <IconTag />
                    <Link href={`/search/${tag.id}/page/1`}>
                      <a className="text-blue-800 border-b-2 border-blue-800">
                        {tag.tag_name}
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
