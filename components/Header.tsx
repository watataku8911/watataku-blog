import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import IconSearch from "../public/img/search.svg";
import IconSearchWhite from "../public/img/search_white.svg";
import IconUser from "../public/img/user.svg";
import IconUserWhite from "../public/img/user_white.svg";
import { TagsContents, Tags } from "../types/blog";
import Modal from "./Modal";
import RSSComponent from "./RSSComponent";
import Switch from "./Switch";
import { getMicroCMSTag } from "../functions/function";

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
    const tags: TagsContents = await getMicroCMSTag();
    return tags.contents;
  };

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <header className="bg-[linear-gradient(to_right,_#ADDFF2_20%,_#5bbee5_80%)] dark:bg-[linear-gradient(to_right,_#7388c0_20%,_#3A4461_80%)]">
      <div className="h-[75px] m-auto flex items-center justify-between w-[90%]">
        <h1 className="dark:text-white text-5xl maxsp:text-4xl font-GreatVibes">
          <Link href="/">T.W</Link>
        </h1>
        <nav className="w-[20%] tbpc:w-[30%] maxsp:w-[50%] flex justify-around items-center">
          <IconSearch
            className="block cursor-pointer hover:scale-125 dark:hidden"
            onClick={handleOpen}
          />
          <IconSearchWhite
            className="hidden cursor-pointer hover:scale-125 dark:block"
            onClick={handleOpen}
          />
          <Modal
            open={open}
            title={"タグ検索"}
            tags={tags}
            handleClose={handleClose}
          />
          <RSSComponent url={"/feed"} />
          <Switch />
        </nav>
      </div>
    </header>
  );
};
export default Header;
