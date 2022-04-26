import { parseISO, format } from "date-fns";
// 日付整形関数
export const datePlasticSurgery = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "yyyy年M月d日");
};

// 文字を丸める関数
export const split = (text: string, maxLength: number): string => {
  let modStr = "・・・";

  if (text.length > maxLength) {
    modStr = text.substr(0, maxLength) + "...";
  } else {
    modStr = text;
  }
  return modStr;
};

//ページング計算
export const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);
