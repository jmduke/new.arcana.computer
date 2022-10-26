import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(
  new URL("../../public/fonts/IBMPlexSans-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const OG = async function (req: NextRequest) {
  const fontData = await font;

  const { searchParams } = new URL(req.url);

  const [title, catalog, image] = searchParams.get("data").split(",");

  return new ImageResponse(
    (
      <div
        style={{
          background: "#fcf9f4",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {image && <img src={image} style={{ objectFit: "contain" }} />}
        <div
          style={{
            fontFamily: '"IBM Plex Sans"',
            display: "flex",
          }}
          tw="px-6 pb-3 pt-2 text-2xl border border-gray-300 rounded-full bottom-8 left-8 font-bold absolute inline-block"
        >
          {catalog && `${catalog} →`} {title}
        </div>

        <div
          style={{
            background: "#dc0909",
            fontFamily: '"IBM Plex Sans"',
          }}
          tw="px-6 pb-3 pt-2 text-2xl rounded-full bottom-8 right-8 font-bold text-white absolute inline-block"
        >
          arcana.computer
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 628,
      fonts: [
        {
          name: "IBM Plex Sans",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
};

export default OG;
