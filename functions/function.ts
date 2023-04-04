import { parseISO, format } from "date-fns";
// 日付整形関数
export const datePlasticSurgery = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "yyyy年MM月dd日");
};

//ページング計算
export const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);
