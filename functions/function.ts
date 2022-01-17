import { parseISO, format } from "date-fns";
// 日付整形関数
export const datePlasticSurgery = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "yyyy年M月d月に");
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
