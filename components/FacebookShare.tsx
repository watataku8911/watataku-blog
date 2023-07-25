import FacebookSvg from "../public/img/icon_facebook.svg";

type Props = {
  url: string;
};

const FacebookShare = (props: Props) => {
  return (
    <p>
      <a
        href={props.url}
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-[#32529f] rounded-lg hover:bg-[#5676c6]"
      >
        <FacebookSvg />
      </a>
    </p>
  );
};
export default FacebookShare;
