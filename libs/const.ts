export const SITE_URL = "https://watataku-blog.vercel.app";

const title = "Watatakuのブログ";
export const returnTitle = (pageTitle?: string) => {
  if (pageTitle !== undefined) {
    return `${pageTitle} | ${title}`;
  } else {
    return title;
  }
};

const description = "Watatakuのブログです";
export const returnDiscription = (pageDiscription?: string) => {
  if (pageDiscription !== undefined) {
    return pageDiscription;
  } else {
    return description;
  }
};
