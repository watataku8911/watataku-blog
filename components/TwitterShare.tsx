import TwitterSvg from "../public/img/icon_twitter.svg";

type Props = {
  url: string;
};

const TwitterShare = (props: Props) => {
  return (
    // 青い鳥(#1da1f2) ホバー(#2388c7)
    // 新(#000)　ホバー(#535657)
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
