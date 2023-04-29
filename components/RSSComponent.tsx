import RSSFeed from "../public/img/icon_rss.svg";

type Props = {
  url: string;
};

const RSSComponent = (props: Props) => {
  return (
    <p>
      <a
        href={props.url}
        target="_blank"
        rel="noreferrer"
        className="block hover:scale-125"
        aria-label="RSSフィード"
      >
        <RSSFeed className="dark:fill-white" />
      </a>
    </p>
  );
};
export default RSSComponent;
