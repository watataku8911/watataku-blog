import { client } from "../seacretDirectory/seacret";
import IconSearch from "../public/img/icon_search.svg";
import { useState, useCallback, useEffect } from "react";
import Modal from "./Modal";
import { TagsContents, Tags } from "../types/blog";
import Link from "next/link";
import RSSComponent from "./RSSComponent";

const Header = () => {
  const [tags, setTags] = useState<Tags[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchGetTags()
      .then((tags) => {
        setTags(tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTags]);

  const fetchGetTags = async (): Promise<Tags[]> => {
    const data: TagsContents = await client.get({
      endpoint: "tags",
      queries: {
        limit: 15,
      },
    });
    return data.contents;
  };

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <header className="h-[75px] bg-[linear-gradient(to_right,_#5bbee4_20%,_#52eac1_80%)] flex justify-around items-center">
      <h1 className="text-white text-2xl font-badScript">
        <Link href="/">Watataku&apos;s Blog</Link>
      </h1>
      <nav className="w-[20%] maxsp:w-[40%] flex justify-around items-center">
        <a className="flex justify-center items-center cursor-pointer hover:scale-150">
          <IconSearch onClick={handleOpen} />
        </a>
        <Modal
          open={open}
          title={"タグ検索"}
          tags={tags}
          handleClose={handleClose}
        />
        {/* <RSSComponent url={"/feed"} /> */}
        <a
          href="https://watataku-portfolio.web.app"
          target="_blank"
          rel="noreferrer"
        >
          <p className="block p-2.5 bg-white text-[#5bbee5] rounded shadow-xl hover:translate-y-0.5">
            ABOUT
          </p>
        </a>
      </nav>
    </header>
  );
};
export default Header;
