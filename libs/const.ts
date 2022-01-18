export const SITE_URL = "https://watataku-blog.vercel.com";

const title = "Watataku's ブログ";
export const returnTitle = (pageTitle?: string) => {
  if (pageTitle !== undefined) {
    return `${pageTitle} | ${title}`;
  } else {
    return title;
  }
};
