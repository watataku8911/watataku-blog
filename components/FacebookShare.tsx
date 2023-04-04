import FacebookSvg from "../public/img/icon_facebook.svg";

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
        <FacebookSvg />
      </a>
    </p>
  );
};
export default TwitterShare;
