import moment from "moment";

export interface FilterDate {
  title?: string;
  value: ValueDate;
  page?: number;
  pageSize?: number;
}
export interface ValueDate {
  from: Date;
  to: Date;
}

const startOfDay = (startdate: Date) =>
  moment(startdate).startOf("day").toDate();

const endOfDay = (enddate: Date) => moment(enddate).endOf("day").toDate();

const today = moment();

const start = startOfDay(today.toDate());
console.log("🚀 ~ file: DataHelper.ts:22 ~ start:", start);
const end = endOfDay(today.toDate());

export const dataFilter: FilterDate[] = [
  {
    title: "Hom nay",
    value: { from: start, to: end },
  },
  {
    title: "7 ngay truoc",
    value: {
      from: today.subtract(7, "days").toDate(),
      to: end,
    },
  },
  {
    title: "15 ngay truoc",
    value: {
      from: today.clone().subtract(9, "days").toDate(),
      to: end,
    },
  },
  {
    title: "30 ngay truoc",
    value: { from: today.subtract(23, "day").toDate(), to: end },
  },
];
