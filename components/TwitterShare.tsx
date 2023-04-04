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
        className="block hover:scale-125"
      >
        <TwitterSvg />
      </a>
    </p>
  );
};
export default TwitterShare;
