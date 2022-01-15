import { parseISO, format } from "date-fns";

// 日付整形関数
export const datePlasticSurgery = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "yyyy年M月d月に");
};
