import TwitterSvg from "../public/img/icon_twitter.svg";

type Props = {
  url: string;
};

const TwitterShare = (props: Props) => {
  return (
    <p>
      <a
        href={props.url}
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-[#000] p-2 rounded-lg hover:bg-[#535657]"
      >
        <TwitterSvg />
      </a>
    </p>
  );
};
export default TwitterShare;
