import { IonIcon } from "@ionic/react";
import { ReactNode, useState } from "react";
import Container from "../../../../components/container/Container";
import SitebarAdmin from "../Sitebar/Sitebar";
import ArrowRise from "../../../../Assets/TSX/ArrowRise";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import ArrowFall from "../../../../Assets/TSX/ArrowFall";
import { useSpring, animated } from "react-spring";
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
// chart\

export const optionsChartLine = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};
const labelsLine = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const dataChartLine = {
  labels: labelsLine,
  datasets: [
    {
      label: "Thiết bị điện tử",
      data: [800, 30, 750, 80, 650, 75, 90],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Đồ gia dụng",
      data: [100, 200, 20, 150, 820, 180, 130],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },

    {
      label: "Khác",
      data: [10, 20, 20, 140, 610, 180, 180],
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

export const dataChartVertical = {
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
export const optionsChartVertical = {
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

export default function StatisticsPage() {
  const numberStast = () => {
    const { number } = useSpring({
      from: { number: 0 },
      number: 1000,
      delay: 300,
      config: { mass: 1, tension: 130, friction: 114 },
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
  const [statsProduct, setStatsProduct] = useState<topProductsStats[]>([
    {
      id: 1,
      name: "Sản phẩm A",
      price: 29.99,
      quantity: 50,
      revenue: 1499.5,
    },
    {
      id: 2,
      name: "Sản phẩm B",
      price: 14.99,
      quantity: 30,
      revenue: 449.7,
    },
    {
      id: 3,
      name: "Sản phẩm C",
      price: 49.99,
      quantity: 20,
      revenue: 999.8,
    },
    {
      id: 4,
      name: "Sản phẩm D",
      price: 39.99,
      quantity: 10,
      revenue: 399.9,
    },
    {
      id: 5,
      name: "Sản phẩm E",
      price: 19.99,
      quantity: 40,
      revenue: 799.6,
    },
    {
      id: 6,
      name: "Sản phẩm F",
      price: 59.99,
      quantity: 15,
      revenue: 899.85,
    },
    {
      id: 7,
      name: "Sản phẩm G",
      price: 24.99,
      quantity: 25,
      revenue: 624.75,
    },
  ]);
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
                <select className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                  <option value="pending">Hôm nay</option>
                  <option value="delivered">Tuần trước</option>
                  <option value="in-transit">Tháng trước</option>
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
                        {numberStast()}
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
                      <p className="text-[#1C1C1C] font-semibold text-xl">
                        12 giờ 30 phut
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
                <div className=" flex flex-col gap-3">
                  <p className="text-[#1C1C1C] font-semibold">Lượt mua hàng</p>
                  <div className="items-center grid grid-cols-3">
                    <div className="col-span-2">
                      <p className="text-[#1C1C1C] font-semibold text-xl">1K</p>
                    </div>
                    <div className="col-span-1 flex gap-1">
                      <p className="text-[#00B207] font-semibold text-xs">
                        +18.01%
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
                  <p className="text-[#1C1C1C] font-semibold">Doanh thu</p>
                  <div className="items-center grid grid-cols-4">
                    <div className="col-span-2">
                      <p className="text-[#1C1C1C] font-semibold text-xl">
                        2,30K
                      </p>
                    </div>
                    <div className="col-end-6 flex gap-1">
                      <p className="text-[#EA4B48] font-semibold text-xs">
                        -8.01%
                      </p>
                      <ArrowFall />
                    </div>
                  </div>
                </div>
                {/* end Truy cập trang */}
                {/* so lieu */}
                {/* end so lieu */}
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
                              Số lượng
                            </th>
                            <th scope="col" className="px-3 py-2">
                              Doanh thu
                            </th>
                          </tr>
                        </thead>
                        {statsProduct.map((items) => {
                          return (
                            <>
                              <tbody>
                                <tr className="transition duration-300 rounded-2xl ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-[#f0f0f0] ">
                                  <td className="whitespace-nowrap px-3 py-2 font-normal">
                                    {items.id}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-2">
                                    {items.name}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-2">
                                    {items.price}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-2">
                                    {items.quantity}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-2">
                                    {items.revenue}
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          );
                        })}
                      </table>
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
