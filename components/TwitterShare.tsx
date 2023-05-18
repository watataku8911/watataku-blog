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
        className="inline-block bg-[#1da1f2] p-2 rounded-lg hover:bg-[#2388c7]"
      >
        <TwitterSvg />
      </a>
    </p>
  );
};
export default TwitterShare;
