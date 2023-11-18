import { IonIcon } from "@ionic/react";
import { useEffect, useState } from "react";
import ArrowRise from "../../../../Assets/TSX/ArrowRise";
import Container from "../../../../components/container/Container";
import SitebarAdmin from "../Sitebar/Sitebar";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import moment from "moment";
import { Bar, Line } from "react-chartjs-2";
import { animated, useSpring } from "react-spring";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import ArrowFall from "../../../../Assets/TSX/ArrowFall";
import { statsControllers } from "../../../../Controllers/StatsControllers";
import { FilterChart } from "../../../../Helper/Date/DataHelper";
import { numberFormat } from "../../../../Helper/Format";
import { HotProductsInRange, Statistics } from "../../../../Model/StatsModels";

ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Legend
);
const optionsChartLine = {
  responsive: true,

  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};
const optionsChartVertical = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Doanh thu trong 7 ngày trước",
      font: {
        size: 20,
      },
    },
  },
};
interface topProductsStats {
  id: number;
  name: string;
  price: number;
  quantity: number;
  revenue: number;
}

interface selectStats {
  id: number;
  nameTime: string;
}

export default function StatisticsPage() {
  const [stats, setStats] = useState<Statistics>({} as Statistics);
  console.log(
    "🚀 ~ file: StatisticsPage.tsx:79 ~ StatisticsPage ~ stats:",
    stats
  );
  const [filterState, setFilterState] = useState<FilterChart>({
    filterValue: {
      from: moment().startOf("date").add(-4, "d").toDate(),
      to: moment().endOf("date").toDate(),
    },
    page: 1,
    pageSize: 3,
  });
  const [isLoadMoreComplete, setIsLoadMoreComplete] = useState(false);

  // Lấy ra từng cái label từ datasets
  const dataSetsLineChart = stats.initialDataChartLine?.datasets
    ?.sort((a, b) => {
      const reduceA = a.data.reduce((a, b) => a + b, 0);
      const reduceB = b.data.reduce((acc, val) => acc + val, 0);

      return reduceB - reduceA;
    })
    .slice(0, 3);

  const chartData = dataSetsLineChart?.map((dataLineChart, index) => {
    return {
      label: dataLineChart.label,
      data: dataLineChart.data,
      borderColor:
        index === 0 ? "#FFB6B9" : index === 1 ? "#687EFF" : "#2E97A7",
      backgroundColor:
        index === 0 ? "#FFE2E2" : index === 1 ? "#80B3FF" : "#64CCC5",
    };
  });

  const dataWithTransformedLabels = {
    labels: stats.initialDataChartLine?.labels || [],
    datasets: chartData ?? [],
  };
  const transformedLabelsLineChart = dataWithTransformedLabels.labels.map(
    (label) => {
      const date = new Date(label);
      const formattedLabel = `${date.getDate()}/${date.getMonth() + 1}`;
      return formattedLabel;
    }
  );

  // Sử dụng transformedLabels trong biểu đồ
  const initialDataChartLine = {
    labels: transformedLabelsLineChart,
    datasets: dataWithTransformedLabels.datasets,
  };

  const datasetsBarChart = stats.initialDataChartBar?.datasets?.map(
    (dataBarChart) => {
      return {
        label: dataBarChart.label,
        data: dataBarChart.data,
        backgroundColor: "#FFB6B9",
      };
    }
  );
  const dataWithTransformedLabelsBarChart = {
    labels: stats.initialDataChartBar?.labels || [],
    datasets: datasetsBarChart ?? [],
  };
  const transformedLabelsBarChart =
    dataWithTransformedLabelsBarChart.labels.map((label) => {
      const date = new Date(label);
      const formattedLabel = `${date.getDate()}/${date.getMonth() + 1}`;
      return formattedLabel;
    });

  // Sử dụng transformedLabels trong biểu đồ
  const initialDataBarLine = {
    labels: transformedLabelsBarChart,
    datasets: dataWithTransformedLabelsBarChart.datasets,
  };

  const numberStast = (n: number) => {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 0,
      config: { mass: 1, tension: 1030, friction: 114 },
    });
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
  };

  const [open, setOpen] = useState(false);

  const openModal = () => {
    const modal = document.getElementById(
      "my_modal_3"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
      setOpen(!open);
    }
  };
  const closeModal = () => {
    const modal = document.getElementById(
      "my_modal_3"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  // ================================ API ================================
  useEffect(() => {
    getProductStats({ ...filterState, page: 1 });
  }, [filterState.filterValue]);

  const getProductStats = (filterState: FilterChart) => {
    statsControllers
      .getStats(filterState)
      .then((res) => setStats(res))
      .catch((err) => console.log(err.response?.data?.message));
  };

  // ================================ handleSelectDateTime ================================

  const handleSelectChange = (
    value: DateValueType,
    e?: HTMLInputElement | null | undefined
  ) => {
    const startDate = moment(value?.startDate!).toDate();
    const endDate = moment(value?.endDate!).toDate();

    setFilterState((prev) => ({
      ...prev,
      filterValue: { from: startDate, to: endDate },
    }));
  };

  // ================================ PANGINATION ================================

  const handleLoadMore = () => {
    setFilterState((prev) => ({ ...prev, page: filterState.page! + 1 }));
    statsControllers
      .getStats({ ...filterState, page: filterState.page! + 1 })
      .then((res) => {
        console.log("🚀 ~ file : StatisticsPage.tsx:211 ~ .then ~ res:", res);
        let arr: HotProductsInRange[] = [];
        if (stats?.hotProductsInRange?.length) {
          arr = stats?.hotProductsInRange.concat(res.hotProductsInRange);
        } else {
          arr = res.hotProductsInRange;
        }
        setStats((prev) => ({ ...prev, hotProductsInRange: arr }));
        if (stats.hotProductsInRange.length == res.hotProductsInRange.length) {
          setIsLoadMoreComplete(true);
        }
      })
      .catch((err) => console.log(err.response?.data?.message));
  };

  const handleShrink = () => {
    setFilterState((prev) => ({ ...prev, page: filterState.page! - 1 }));
    statsControllers
      .getStats({ ...filterState, page: filterState.page! - 1 })
      .then((res) => {
        let arr: HotProductsInRange[] = [];
        if (res.hotProductsInRange.length) {
          arr = res.hotProductsInRange?.reduce((acc, item) => {
            if (!stats.hotProductsInRange?.includes(item)) {
              acc.push();
            }
            return acc;
          }, []);
        } else {
          arr = stats.hotProductsInRange;
        }
        setStats((prev) => ({ ...prev, hotProductsInRange: arr }));
        setIsLoadMoreComplete(false);
      });
  };

  // chart

  return (
    <>
      <Container>
        <div
          className="float-right cursor-pointer max-[1920px]:invisible max-2xl:visible"
          onClick={() => openModal()}
        >
          <IonIcon className="text-[2rem]" name={"menu"}></IonIcon>
        </div>
        <div className="grid grid-cols-5">
          <div className={`col-span-1`}>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="max-2xl:modal ">
              <div className="relative">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-[120px]"
                  onClick={closeModal}
                >
                  ✕
                </button>
                <SitebarAdmin />
              </div>
            </dialog>
            <div className="max-2xl:hidden">
              <SitebarAdmin />
            </div>
          </div>
          <div className="content-right-filter mt-[34px] col-span-4 max-2xl:col-span-5 ">
            {/* h2 */}
            <div className="flex justify-between items-center">
              <h2 className="txt-filter font-bold text-[#1A1A1A] text-3xl max-2xl:text-2xl">
                THỐNG KÊ BUYZZLE
              </h2>
              <button
                className="btn btn-outline items-center btn-sm text-xs hover:bg-[#eefff8]
               text-green-600 hover:text-green-600 hover:border-[#16A46D] flex"
                // onClick={() => {
                //   const csv = generateCsv(csvConfig)(stats.); // Xuat excel
                //   download(csvConfig)(csv);
                // }}
              >
                Xuất excel
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-[52px] flex">
              {/* dateTimePicker */}
              <Datepicker
                // disabledDates={disabledDates}
                startWeekOn="mon"
                primaryColor={"rose"}
                value={{
                  startDate: filterState.filterValue.from,
                  endDate: filterState.filterValue.to,
                }}
                separator={"~"}
                onChange={handleSelectChange}
                displayFormat={"DD/MM/YYYY"}
                showShortcuts={true}
                configs={{
                  shortcuts: {
                    today: "Hôm nay",
                    yesterday: "Hôm qua",
                    past: (period) => `${period} ngày trước`,
                    currentMonth: "Tháng này",
                    pastMonth: "Tháng trước",
                  },
                }}
              />
              {/* end dateTimePicker */}
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="col-span-1 inline-flex items-center gap-1.5 p-6 rounded-2xl font-medium bg-blue-100 text-blue-800">
                {/* Truy cập trang */}
                <div className=" flex flex-col gap-3">
                  <p className="text-[#1C1C1C] font-semibold">Truy cập trang</p>
                  <div className="items-center grid grid-cols-3">
                    <div className="col-span-2">
                      <p className="text-[#1C1C1C] font-semibold text-xl">
                        {numberStast(99999)}
                      </p>
                    </div>
                    <div className="col-span-1 flex gap-1">
                      <p className="text-[#00B207] font-semibold text-xs">
                        +11.01%
                      </p>
                      <ArrowRise />
                    </div>
                  </div>
                </div>
                {/* end Truy cập trang */}
                {/* so lieu */}
                {/* end so lieu */}
              </div>

              <div className="col-span-1 inline-flex items-center gap-1.5 p-6 rounded-2xl font-medium bg-[#E5ECF6] text-blue-800">
                {/* Truy cập trang */}
                <div className=" flex flex-col gap-3">
                  <p className="text-[#1C1C1C] font-semibold">
                    Thời gian ở lại
                  </p>
                  <div className="items-center grid grid-cols-5">
                    <div className="col-span-4">
                      <p className="text-[#1C1C1C] font-semibold text-base gap-1 flex">
                        {numberStast(39)} giờ {numberStast(90)} phut
                      </p>
                    </div>
                    <div className="col-end-6 flex gap-1">
                      <p className="text-[#EA4B48] font-semibold text-xs">
                        -1.01%
                      </p>
                      <ArrowFall />
                    </div>
                  </div>
                </div>
                {/* end Truy cập trang */}
                {/* so lieu */}
                {/* end so lieu */}
              </div>

              <div className="col-span-1 inline-flex items-center gap-1.5 p-6 rounded-2xl font-medium bg-blue-100 text-blue-800">
                {/* Truy cập trang */}
                <div className=" flex flex-col gap-3 justify-between w-full">
                  <div>
                    <p className="text-[#1C1C1C] font-semibold">
                      Lượt mua hàng
                    </p>
                  </div>
                  <div className="items-center grid grid-cols-4">
                    <div className="col-span-2">
                      <p className="text-[#1C1C1C] font-semibold text-xl">
                        {numberStast(stats.purchaseOrShoppingInRange)}
                      </p>
                    </div>
                    <div className="col-end-6 flex gap-1">
                      <p className="text-[#00B207] font-semibold text-xs">
                        {stats.percentageQuantitySold}
                      </p>
                      <ArrowRise />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 inline-flex items-center gap-1.5 p-6 rounded-2xl font-medium bg-[#E5ECF6] text-blue-800">
                <div className=" flex flex-col gap-3 justify-between w-full">
                  <div>
                    <p className="text-[#1C1C1C] font-semibold">Doanh thu</p>
                  </div>
                  <div className="items-center grid grid-cols-4">
                    <div className="col-span-2">
                      <p className="text-[#1C1C1C] font-semibold text-xl">
                        {numberFormat(
                          Number(numberStast(stats.totalRevenueInRange))
                        )}
                      </p>
                    </div>
                    <div className="col-end-6 flex gap-1 ">
                      <p className="text-[#EA4B48] font-semibold text-xs ">
                        {numberStast(stats.revenuePercentageInRange)}
                      </p>
                      <ArrowFall />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* stats */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-[#F7F9FB] rounded-2xl p-6 col-span-1">
                <p className="text-xl font-bold text-[#6E6E6E] text-center w-full mx-auto content-center">
                  Top 3 danh mục có số lượng sản phẩm bán ra cao nhất
                </p>
                <div>
                  <Line
                    options={optionsChartLine}
                    data={initialDataChartLine}
                  />
                </div>
              </div>

              <div className="bg-[#F7F9FB] rounded-2xl p-6 col-span-1">
                <div>
                  <Bar
                    options={optionsChartVertical}
                    data={initialDataBarLine}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#F7F9FB] p-6 mt-3 rounded-2xl">
              <p className="text-[#1C1C1C] font-semibold">Top sản phẩm</p>
              {/* table */}
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b border-[#c7c7c7] font-medium ">
                          <tr>
                            <th scope="col" className="px-3 py-2"></th>
                            <th scope="col" className="px-3 py-2">
                              Tên
                            </th>
                            <th scope="col" className="px-3 py-2">
                              Giá
                            </th>
                            <th scope="col" className="px-3 py-2">
                              Lượt mua
                            </th>
                            <th scope="col" className="px-3 py-2">
                              Doanh thu
                            </th>
                          </tr>
                        </thead>
                        {stats.hotProductsInRange?.map((items) => {
                          return (
                            <tbody key={items.id}>
                              <tr className="transition duration-300 rounded-2xl ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-[#f0f0f0] ">
                                <td className="whitespace-nowrap px-3 py-2 font-semibold">
                                  <span className="font-normal">#ID:</span>
                                  00
                                  {items.id}
                                </td>
                                <td className="whitespace-nowrap px-3 py-2">
                                  {items.name.length > 40
                                    ? `${items.name.substring(0, 40)}...`
                                    : items.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-2">
                                  {numberFormat(items.price)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-2">
                                  {items._sum.quantity} sản phẩm
                                </td>
                                <td className="whitespace-nowrap px-3 py-2">
                                  {numberFormat(items.total)}
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* see more */}
              <div className="mt-3">
                {!isLoadMoreComplete ? (
                  <p
                    onClick={handleLoadMore}
                    className="text-[#5D5FEF] text-sm cursor-pointer hover:text-[#4648cc] duration-200"
                  >
                    Xem thêm..
                  </p>
                ) : (
                  <p
                    onClick={handleShrink}
                    className="text-[#5D5FEF] text-sm cursor-pointer hover:text-[#4648cc] duration-200"
                  >
                    Thu gọn..
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
