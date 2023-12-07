import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Search from "../../../../../assets/TSX/Search";
import Container from "../../../../../components/container/Container";
import { shipperController } from "../../../../../controllers/ShipperController";
import SitebarAdmin from "../../Sitebar/Sitebar";
import Download from "../../assets/TSX/Download";
import Edit from "../../assets/TSX/Edit";
import RemoveCate from "../../assets/TSX/RemoveCate";
import Handle from "../../assets/TSX/bacham";
import { download, generateCsv } from "export-to-csv";
import { csvConfig } from "../../../../../helper/Export/Excel";
import EmptyPage from "../../../../../helper/Empty/EmptyPage";

export interface shipper {
  id: number;
  username: string;
  name: string;
  email: string;
  sex: string;
}

export default function Shipper() {
  let status = "Hoạt động";
  const [users, setUsers] = useState<any>({});
  const getAllShipper = () => {
    shipperController
      .getAllShipper()
      .then((res) => {
        return res;
      })
      .then((res) => {
        setUsers(res);
        console.log("Test" + JSON.stringify(res));
      });
  };

  useEffect(() => {
    getAllShipper();
  }, []);

  function JumpEditUser(username: any) {
    window.location.href = `detailshipper/${username}`;
  }

  const DeleteUser = (id: any) => {
    shipperController
      .deleteShipperWhereId(id)
      .then((res) => {
        toast.success("Xóa thành công !");
        console.log("res:" + res);
        getAllShipper();
      })
      .catch(() => {
        toast.error("Xóa thất bại !");
      });
  };

  return (
    <Container>
      <div className="grid grid-cols-5">
        <div className="col-span-1 max-2xl:hidden">
          <SitebarAdmin />
        </div>
        <div className="content-right-filter mt-[34px] col-span-4 flex flex-col gap-[50px] max-2xl:col-span-5">
          <div>
            <h2
              className="txt-filter font-bold text-[#1A1A1A] text-3xl
                            max-lg:text-xl"
            >
              QUẢN LÝ DANH SÁCH SHIPPER
            </h2>
          </div>
          <div className="flex flex-col gap-[35px]">
            <div className="flex gap-[24px]">
              <div
                className="Search-input-headerCenter items-center flex
                                    py-[3px] px-[6px] border-[1px] border-[#FFAAAF] rounded-md"
              >
                <div className="mb-2">
                  <Search />
                </div>
                <input
                  className=" rounded-lg focus:outline-none text-lg relative pr-7 flex-1 pl-3 max-xl:text-sm max-lg:text-sm"
                  placeholder="Tìm kiếm..."
                />
              </div>
              <div className="flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer">
                <Download />
                <button className="text-center text-base font-bold text-[#EA4B48] max-lg:text-sm"
                  onClick={() => {
                    const csv = generateCsv(csvConfig)(users as []);
                    download(csvConfig)(csv);
                  }}>
                  Xuất excel
                </button>
              </div>
            </div>
          </div>

          <div className="relative ">
            <table className="w-full text-left ">
              <thead className="text-base text-[#4C4C4C] border-b-[2px] border-[#E0E0E0] max-xl:text-sm max-lg:text-[11px]">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Tên
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Tên Đăng Nhâp
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Email / Sđt
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Giới Tính
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Thành phố vận chuyển
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Số điện thoại
                  </th>
                </tr>
              </thead>

              {users?.length > 0 && (
                users?.map((items: any) => {
                  return (
                    <>
                      <tbody>
                        <tr className="bg-white border-b-[2px] border-[#E0E0E0] max-xl:text-sm max-lg:text-xs">
                          <th
                            scope="row"
                            className="px-3 py-5 max-lg:py-3 justify-center font-medium text-gray-900"
                          >
                            {items.id}
                          </th>
                          <td className="px-3 py-5 max-lg:py-3 justify-center">
                            {items.name}
                          </td>
                          <td className="px-3 py-5 max-lg:py-3 justify-center">
                            {items.username}
                          </td>
                          <td className="px-3 py-5 max-lg:py-3 justify-center">
                            {items.email}
                          </td>
                          <td className="px-3 py-5 max-lg:py-3 justify-center">
                            {items.sex
                              ? (items.sex = "Nam")
                              : (items.sex = "Nữ")}
                          </td>

                          <td className="px-3 py-5 max-lg:py-3 justify-center">
                            {items.city}
                          </td>
                          <td
                            className={`
                                "text-[#00B207] px-3 py-5 max-lg:py-3 justify-center"
                                
                              `}
                          >
                            {items.phonenumber}
                          </td>
                          <th
                            scope="row"
                            className="flex gap-2 items-center px-3 py-5 max-lg:py-3"
                          >
                            <div className="dropdown dropdown-left">
                              <label
                                className="max-lg:w-[24px] max-lg:h-[24px]"
                                tabIndex={1}
                              >
                                <Handle />
                              </label>
                              <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-white rounded-box w-52
                                                shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]
                                                max-2xl:left-[100%] max-2xl:origin-left max-[940px]:w-32 max-[940px]:h-[88px] max-[940px]:rounded"
                              >
                                <li>
                                  <button
                                    className="flex items-center gap-4"
                                    onClick={() => JumpEditUser(items.username)}
                                  >
                                    <Edit />
                                    <p
                                      className="text-[#EA4B48] text-sm font-medium
                                            max-[940px]:text-xs "
                                    >
                                      Xem chi tiết
                                    </p>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </th>
                        </tr>
                      </tbody>
                    </>
                  );
                })
              )}
            </table>
            {
              users?.length == 0 && (
                <>
                  <EmptyPage
                    title="Danh sách sản phẩm trống"
                  />
                </>
              )
            }
          </div>
        </div>
      </div>
    </Container>
  );
}
