import React, { useState } from "react";
import Container from "../../../../../components/container/Container";
import SitebarAdmin from "../../Sitebar/Sitebar";
import Search from "../../../../../Assets/TSX/Search";
import Download from "../../Assets/TSX/Download";
import Delete from "../../Assets/TSX/Delete";
import RemoveCate from "../../Assets/TSX/RemoveCate";
import Edit from "../../Assets/TSX/Edit";
import Handle from "../../Assets/TSX/bacham";
import { numberFormat } from "../../../../../Helper/Format";

export default function User() {
  const active = [
    {
      idUser: "#1334",
      userName: "tranvanA231",
      EmailOrSđt: "tranvanA@gmail.com",
      Sex: "Nam",
      idCart: 102,
      totalAmount: 3999999,
      status: "Hoạt động",
    },
    {
      idUser: "#1335",
      userName: "tranvanA231",
      EmailOrSđt: "tranvanA@gmail.com",
      Sex: "Nam",
      idCart: 102,
      totalAmount: 3999999,
      status: "Hoạt động",
    },
    {
      idUser: "#1336",
      userName: "tranvanA231",
      EmailOrSđt: "tranvanA@gmail.com",
      Sex: "Nam",
      idCart: 102,
      totalAmount: 3999999,
      status: "Ngừng Hoạt động",
    },
    {
      idUser: "#1337",
      userName: "tranvanA231",
      EmailOrSđt: "tranvanA@gmail.com",
      Sex: "Nam",
      idCart: 102,
      totalAmount: 3999999,
      status: "Hoạt động",
    },
  ];


  let status = "Hoạt động";
  const [users, setUsers] = useState<any>({});
  const getAllUserData = () => {
    userController.getAllUser()
      .then((res) => {
        return res;
      })
      .then((res) => {

        setUsers(res);
        console.log("Test" + JSON.stringify(res));
      })

  }

  useEffect(() => {
    getAllUserData();
  }, [])


  function JumpEditUser(username: any){
    window.location.href = `userprofilepage/${username}`;
  }

  const DeleteUser = (id: any) => {
    userController.deleteUser(id)
      .then((_) => {
        toast.success("Xóa thành công !");
        getAllUserData();
      })
      .catch(() => {
        toast.error("Xóa thất bại !");
      });
  }


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
              QUẢN LÝ DANH SÁCH NGƯỜI DÙNG
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
                <button className="text-center text-base font-bold text-[#EA4B48] max-lg:text-sm">
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
                    className="flex gap-2 items-center px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    <Delete />
                    <p>Xóa</p>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Id User
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
                    Số Đơn Hàng
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Tổng Số Tiền
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Trạng Thái
                  </th>
                </tr>
              </thead>
              {active.map((items) => {
                return (
                  <>
                    <tbody>
                      <tr className="bg-white border-b-[2px] border-[#E0E0E0] max-xl:text-sm max-lg:text-xs">
                        <th
                          scope="row"
                          className="flex gap-2 items-center px-3 py-5 max-lg:py-3"
                        >
                          <div className="dropdown dropdown-left ">
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
                                  <button className="flex items-center gap-4"
                                   onClick={() => JumpEditUser(items.username)}
                                  >
                                    <Edit />
                                    <p
                                      className="text-[#EA4B48] text-sm font-medium
                                            max-[940px]:text-xs "
                                  >
                                    Sửa
                                  </p>
                                </button>
                              </li>
                              <li>
                                <button className="flex items-center gap-4">
                                  <RemoveCate />
                                  <p
                                    className="text-[#EA4B48] text-sm font-medium
                                             max-[940px]:text-xs "
                                  >
                                    Xóa
                                  </p>
                                </button>
                              </li>
                            </ul>
                          </div>
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-[#EA4B48]  max-lg:w-[14px] max-lg:h-[14px] max-[940px]:w-3"
                          />
                        </th>
                        <th
                          scope="row"
                          className="px-3 py-5 max-lg:py-3 justify-center font-medium text-gray-900"
                        >
                          {items.idUser}
                        </th>
                        <td className="px-3 py-5 max-lg:py-3 justify-center">
                          {items.userName}
                        </td>
                        <td className="px-3 py-5 max-lg:py-3 justify-center">
                          {items.EmailOrSđt}
                        </td>
                        <td className="px-3 py-5 max-lg:py-3 justify-center">
                          {items.Sex}
                        </td>
                        <td className="px-3 py-5 max-lg:py-3 justify-center">
                          {items.idCart}
                        </td>
                        <td className="px-3 py-5 max-lg:py-3 justify-center">
                          {numberFormat(items.totalAmount)}
                        </td>
                        <td
                          className={`${
                            items.status == "Hoạt động"
                              ? "text-[#00B207] px-3 py-5 max-lg:py-3 justify-center"
                              : "text-[#FF8A00] "
                          }`}
                        >
                          {items.status}
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
    </Container>
  );
}
