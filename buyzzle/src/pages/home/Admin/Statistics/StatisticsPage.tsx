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
import { Bar, Line } from "react-chartjs-2";
import { animated, useSpring } from "react-spring";
import ArrowFall from "../../../../Assets/TSX/ArrowFall";
import { statsControllers } from "../../../../Controllers/StatsControllers";
import { Category, Statistics } from "../../../../Model/StatsModels";
import { numberFormat } from "../../../../Helper/Format";
import {
  FilterDate,
  ValueDate,
  dataFilter,
} from "../../../../Helper/Date/DataHelper";
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
      text: "Doanh thu trong tuần",
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
  const [cate, setCate] = useState<Category>();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number>(1); // Mặc định chọn "Hôm nay"

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
    getProductStats(dataFilter[0].value.from, dataFilter[0].value.to);
  }, [dataFilter]);

  const getProductStats = async (startDate: Date, endDate: Date) => {
    const data: FilterDate = {
      value: {
        from: startDate,
        to: endDate,
      },
      page: 1,
      pageSize: 3,
    };

    try {
      const res = await statsControllers.getStats(data);
      console.log("🚀 ~ file: StatisticsPage.tsx:199 ~ res:", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ================================ handleSelect ================================

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(
      "🚀 ~ file: StatisticsPage.tsx:233 ~ handleSelectChange ~ event:",
      event.target.value
    );
    setSelectedOption(Number(event.target.value));
    console.log(
      "🚀 ~ file: StatisticsPage.tsx:239 ~ handleSelectChange ~  JSON.parse(event.target.value);:",
      JSON.parse(event.target.value)
    );

    const filterDate: ValueDate = JSON.parse(event.target.value);
    getProductStats(filterDate.from, filterDate.to);
  };
  // ================================ PANGINATION ================================

  const getItemProps = (index: number) =>
    ({
      variant: currentPage === index ? "filled" : "text",
      color: "gray",
      onClick: () => setCurrentPage(index),
    } as any);

  // ================================ CHART ================================

  // const next = () => {

  //   if (currentPage === 999) return;

  //   setCurrentPage(currentPage + 1);
  // };

  // const prev = () => {
  //   if (currentPage === 1) return;

  //   setCurrentPage(currentPage - 1);
  // };

  // chart

  const labelsLine = [
    "Ngày hôm qua",
    "1 ngày trước",
    "2 ngày trước",
    "3 ngày trước",
    "4 ngày trước",
    "5 ngày trước",
    "6 ngày trước",
  ];

  const dataChartLine = {
    labels: labelsLine,
    datasets: [
      {
        label: `${cate?.name}`,
        data: [170, 30, 50, 130, 250],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Đồ gia dụng",
        data: [100, 200, 120, 120],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },

      {
        label: "Khác",
        data: [10, 120, 20, 40],
        borderColor: "#95A4FC",
        backgroundColor: "#cad2ff",
      },
    ],
  };

  const labelsVertical = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const dataChartVertical = {
    labels: labelsVertical,
    datasets: [
      {
        label: "Dataset 1",
        data: [800, 30, 70, 80, 650, 75, 900],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [100, 200, 20, 150, 820, 180, 930],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
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
            <div>
              <h2 className="txt-filter font-bold text-[#1A1A1A] text-3xl max-2xl:text-2xl">
                THỐNG KÊ BUYZZLE
              </h2>
            </div>
            <div className="mt-[52px]">
              {/* Select box */}
              <div className="relative h-10 w-[142px] min-w-[200px]">
                <select
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent
                 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 
                 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200
                  empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 
                  disabled:bg-blue-gray-50"
                  onChange={handleSelectChange}
                  value={selectedOption}
                >
                  {dataFilter.map((itemsSelect) => {
                    console.log(
                      "🚀 ~ file: StatisticsPage.tsx:378 ~ {dataFilter.map ~ itemsSelect:",
                      itemsSelect
                    );
                    return (
                      <option value={JSON.stringify(itemsSelect.value)}>
                        {itemsSelect.title}
                      </option>
                    );
                  })}
                </select>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Thời gian
                </label>
              </div>
              {/* end Select box  */}
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
                  {selectedOption == 1 && (
                    <div className="items-center grid grid-cols-4">
                      <div className="col-span-2">
                        <p className="text-[#1C1C1C] font-semibold text-xl">
                          {numberStast(stats.purchaseOrShoppingInToday)}
                        </p>
                      </div>
                      <div className="col-end-6 flex gap-1">
                        <p className="text-[#00B207] font-semibold text-xs">
                          {stats.productSoldPercentageToday}
                        </p>
                        <ArrowRise />
                      </div>
                    </div>
                  )}
                  {selectedOption == 2 && (
                    <div className="items-center grid grid-cols-4">
                      <div className="col-span-2">
                        <p className="text-[#1C1C1C] font-semibold text-xl">
                          {numberStast(stats.purchaseOrShoppingLast7Days)}
                        </p>
                      </div>
                      <div className="col-end-6 flex gap-1">
                        <p className="text-[#00B207] font-semibold text-xs">
                          {stats.productSoldPercentageLast7Days}
                        </p>
                        <ArrowRise />
                      </div>
                    </div>
                  )}
                  {selectedOption == 3 && (
                    <div className="items-center grid grid-cols-4">
                      <div className="col-span-2">
                        <p className="text-[#1C1C1C] font-semibold text-xl">
                          {numberStast(stats.purchaseOrShoppingLast15Days)}
                        </p>
                      </div>
                      <div className="col-end-6 flex gap-1">
                        <p className="text-[#00B207] font-semibold text-xs">
                          {stats.productSoldPercentageLast15Days}
                        </p>
                        <ArrowRise />
                      </div>
                    </div>
                  )}
                  {selectedOption == 4 && (
                    <div className="items-center grid grid-cols-4">
                      <div className="col-span-2">
                        <p className="text-[#1C1C1C] font-semibold text-xl">
                          {numberStast(stats.purchaseOrShoppingLast30Days)}
                        </p>
                      </div>
                      <div className="col-end-6 flex gap-1">
                        <p className="text-[#00B207] font-semibold text-xs">
                          {stats.productSoldPercentageLast30Days}
                        </p>
                        <ArrowRise />
                      </div>
                    </div>
                  )}
                </div>
                {/* end Truy cập trang */}
                {/* so lieu */}
                {/* end so lieu */}
              </div>

              <div className="col-span-1 inline-flex items-center gap-1.5 p-6 rounded-2xl font-medium bg-[#E5ECF6] text-blue-800">
                <div className=" flex flex-col gap-3 justify-between w-full">
                  <div>
                    <p className="text-[#1C1C1C] font-semibold">Doanh thu</p>
                  </div>
                  {selectedOption == 1 && (
                    <div className="items-center grid grid-cols-4">
                      <div className="col-span-2">
                        <p className="text-[#1C1C1C] font-semibold text-xl">
                          {numberStast(stats.totalRevenueToday)}
                        </p>
                      </div>
                      <div className="col-end-6 flex gap-1 ">
                        <p className="text-[#EA4B48] font-semibold text-xs ">
                          {numberStast(parseInt(stats.revenuePercentageToday))}
                        </p>
                        <ArrowFall />
                      </div>
                    </div>
                  )}
                  {selectedOption == 2 && (
                    <div className="items-center grid grid-cols-4">
                      <div className="col-span-2">
                        <p className="text-[#1C1C1C] font-semibold text-xl">
                          {numberStast(stats.totalRevenueLast7Days)}
                        </p>
                      </div>
                      <div className="col-end-6 flex gap-1 ">
                        <p className="text-[#EA4B48] font-semibold text-xs ">
                          {numberStast(
                            parseInt(stats.revenuePercentageLast7Days)
                          )}
                        </p>
                        <ArrowFall />
                      </div>
                    </div>
                  )}
                  {selectedOption == 3 && (
                    <div className="items-center grid grid-cols-4">
                      <div className="col-span-2">
                        <p className="text-[#1C1C1C] font-semibold text-xl">
                          {numberStast(stats.totalRevenueLast15Days)}
                        </p>
                      </div>
                      <div className="col-end-6 flex gap-1 ">
                        <p className="text-[#EA4B48] font-semibold text-xs ">
                          {numberStast(
                            parseInt(stats.revenuePercentageLast15Days)
                          )}
                        </p>
                        <ArrowFall />
                      </div>
                    </div>
                  )}
                  {selectedOption == 4 && (
                    <div className="items-center grid grid-cols-4">
                      <div className="col-span-2">
                        <p className="text-[#1C1C1C] font-semibold text-xl">
                          {numberStast(stats.totalRevenueLast30Days)}
                        </p>
                      </div>
                      <div className="col-end-6 flex gap-1 ">
                        <p className="text-[#EA4B48] font-semibold text-xs ">
                          {numberStast(
                            parseInt(stats.revenuePercentageLast30Days)
                          )}
                        </p>
                        <ArrowFall />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* stats */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-[#F7F9FB] rounded-2xl p-6 col-span-1">
                <p className="text-xl font-bold text-[#6E6E6E] text-center w-full mx-auto content-center">
                  Top loại sản phẩm
                </p>
                <div>
                  <Line options={optionsChartLine} data={dataChartLine} />{" "}
                </div>
              </div>

              <div className="bg-[#F7F9FB] rounded-2xl p-6 col-span-1">
                <div>
                  <Bar
                    options={optionsChartVertical}
                    data={dataChartVertical}
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
                      {selectedOption === 1 && (
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
                          {stats.hotProductsInToday?.map((items) => {
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
                      )}
                      {selectedOption === 2 && (
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
                          {stats.hotProductLast7days?.map((items) => {
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
                      )}
                      {selectedOption === 3 && (
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
                          {stats.hotProductLast15days?.map((items) => {
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
                      )}
                      {selectedOption === 4 && (
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
                          {stats.hotProductLast30days?.map((items) => {
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* see more */}
              <div className="mt-3">
                <p className="text-[#5D5FEF] text-sm cursor-pointer hover:text-[#4648cc] duration-200">
                  Xem thêm...
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
