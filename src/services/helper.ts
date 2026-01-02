import dayjs from "dayjs";

export const FORMATE_DATE = "YYYY-MM-DD HH:mm:ss";

export const dateRangeValidate = (dateRange: string[]) => {
  if (!dateRange) return undefined;

  const startDate = dayjs(dateRange[0]).startOf("day").format(FORMATE_DATE);
  const endDate = dayjs(dateRange[1]).endOf("day").format(FORMATE_DATE);

  return [startDate, endDate];
};

export const formatDate = (date: Date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatVND = (value: string | number) => {
  value = value.toString().replace(/\./g, "");

  const formatted = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  })
    .format(+value)
    .replace("VND", "")
    .trim();

  return `${formatted} ₫`;
};
