import { ImageResponse } from "next/server";
import { NextApiHandler } from "next";

export const config = {
  runtime: "edge",
};

const handler: NextApiHandler = async (req) => {
  if (!req.url) throw Error("not supported.");
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const postDate = searchParams.get("postDate");

  return new ImageResponse(
    (
      <div
        lang="ja-JP"
        style={{
          backgroundColor: "#5bbee5",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          position: "relative",
        }}
      >
        <h2
          style={{
            width: "100%",
            color: "white",
            fontSize: 64,
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
              color: "white",
              fontSize: 40,
            }}
          >
            {postDate}
          </h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};

export default handler;
