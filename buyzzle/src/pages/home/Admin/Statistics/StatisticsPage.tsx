import { IonIcon } from "@ionic/react";
import { ReactNode, useState } from "react";
import Container from "../../../../components/container/Container";
import SitebarAdmin from "../Sitebar/Sitebar";
import ArrowRise from "../../../../Assets/TSX/ArrowRise";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import ArrowFall from "../../../../Assets/TSX/ArrowFall";
import { number } from "yup";
ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend
);

// chart\

export const optionsChartCircle = {
  canvas: {
    plugin: {
      legend: {
        position: "center" as const,
      },
    },
  },
  relative: true,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        color: "rgb(255, 99, 132)",
        font: {
          size: 15,
        },
      },
    },
    scales: {
      r: {
        ticks: {
          backdropPadding: {
            x: 10,
          },
        },
      },
    },
    title: {
      display: true,
      text: "Top loại sản phẩm",
      font: {
        size: 20,
      },
    },
  },
};
export const dataChartCircle = {
  labels: ["Thiết bị điện tử", "Đồ gia dụng", "Thực phẩm", "Khác"],
  datasets: [
    {
      label: "# of Votes",
      data: [38.6, 22.5, 30.8, 8.1],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 2 /* change this */,
      hoverOffset: 4,
    },
  ],
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const dataChartVertical = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => [0, 200], 1000),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => [0, 500], 1000),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
export const optionsChartVertical = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
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

export default function StatisticsPage() {
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
                        721K
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
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-[#F7F9FB] rounded-2xl col-span-1">
                <div className="w-[480px] h-[480px]">
                  <Pie options={optionsChartCircle} data={dataChartCircle} />{" "}
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
          </div>
        </div>
      </Container>
    </>
  );
}
