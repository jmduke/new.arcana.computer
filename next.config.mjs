import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);
