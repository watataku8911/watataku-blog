import { NextApiHandler } from "next";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const notoSansJP = fetch(
  new URL("../../public/font/NotoSansJP-Bold.otf", import.meta.url).toString()
).then((res) => res.arrayBuffer());
const greatVibes = fetch(
  new URL(
    "../../public/font/GreatVibes-Regular.ttf",
    import.meta.url
  ).toString()
).then((res) => res.arrayBuffer());

const handler: NextApiHandler = async (req) => {
  if (!req.url) throw Error("not supported.");

  const { searchParams } = new URL(req.url);
  const fontNoto = await notoSansJP;
  const fontGreat = await greatVibes;

  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 60)
    : "Watatakuのブログだよ〜ん。";
  const hasPostDate = searchParams.has("postDate");
  const postDate = hasPostDate
    ? searchParams.get("postDate")
    : "〇〇〇〇年〇〇月〇〇日投稿";
  return new ImageResponse(
    (
      <div
        style={{
          borderWidth: "36px",
          borderColor: "#5bbee5",
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          fontFamily: '"NotoSansJP"',
          position: "relative",
        }}
      >
        <h2
          style={{
            color: "black",
            fontSize: 64,
            fontFamily: '"NotoSansJP"',
          }}
        >
          {title}
        </h2>
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: "100%",
            bottom: 0,
            paddingRight: 32,
            justifyContent: "flex-end",
          }}
        >
          <h2
            style={{
              color: "black",
              fontSize: 40,
              fontFamily: '"NotoSansJP"',
            }}
          >
            {postDate}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: "100%",
            top: 0,
            paddingLeft: 32,
            justifyContent: "flex-start",
          }}
        >
          <h2
            style={{
              color: "black",
              fontSize: 56,
              fontFamily: "Great Vibes",
            }}
          >
            T.W
          </h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "NotoSansJP",
          data: fontNoto,
          style: "normal",
        },
        {
          name: "Great Vibes",
          data: fontGreat,
          style: "normal",
        },
      ],
    }
  );
};

export default handler;
