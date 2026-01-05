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

export const formatDisplaySold = (sold: number) => {
  if (!sold) return 0;
  if (sold < 1000) return sold;

  if (sold >= 1000 && sold < 1000000) {
    const kValue = sold / 1000;
    return kValue.toFixed(1).replace(/\.0$/, "") + "K";
  }

  if (sold >= 1000000 && sold < 1000000000) {
    const mValue = sold / 1000000;
    return mValue.toFixed(1).replace(/\.0$/, "") + "M";
  }

  if (sold >= 1000000000) {
    const bValue = sold / 1000000000;
    return bValue.toFixed(1).replace(/\.0$/, "") + "B";
  }

  return sold;
};
