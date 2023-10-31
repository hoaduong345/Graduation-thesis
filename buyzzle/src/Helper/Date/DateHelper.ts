import * as moment from "moment";
interface FilterDate {
  title: string;
  value: ValueDate;
}
interface ValueDate {
  from: Date;
  to: Date;
}
const today = moment();
const startOfDay = (startdate: Date) =>
  moment(startdate).startOf("days").toDate();
const endOfDay = (enddate: Date) => moment(enddate).endOf("days").toDate();
export const dataFilter: FilterDate[] = [
  { title: "Hom nay", value: { from: startOfDay(new Date()), to: new Date() } },
  {
    title: "7 ngay truoc",
    value: { from: today.subtract(7, "days").toDate(), to: new Date() },
  },
];
