import React, { useEffect, useState } from "react";
import Container from "../../../../../components/container/Container";
import SitebarAdmin from "../../Sitebar/Sitebar";
import Search from "../../../../../Assets/TSX/Search";
import Download from "../../Assets/TSX/Download";
import Delete from "../../Assets/TSX/Delete";
import RemoveCate from "../../Assets/TSX/RemoveCate";
import Edit from "../../Assets/TSX/Edit";
import Handle from "../../Assets/TSX/bacham";
import { userController } from "../../../../../Controllers/UserController";
import EmptyPage from "../../../../../Helper/Empty/EmptyPage";
import { toast } from "react-toastify";
import { adminController } from "../../../../../Controllers/AdminControllder";
import PlusSquare from "../../Assets/TSX/PlusSquare";
import DialogModal from "../../../../../Helper/Dialog/DialogModal";
import { Controller, useForm } from "react-hook-form";
import DialogAddAdmin from "../../../../../Helper/Dialog/DialogAddAdmin";

export interface admin {
  id: number;
  username: string;
  name: string;
  email: string;
  sex: string;
  dateofbirth: string;
  phonenumber: string;
}
export interface FormValues {
  name: string;
  username: string
  email: string;
  password: string;
  comfirmPassword: string;


}

export default function Admin() {
  const active = [
    {
      id: "#1334",
      username: "tranvanA231",
      email: "tranvanA@gmail.com",
      sex: "Nam",
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
  const [admin, setAdmin] = useState<any>({});
  const idAddAdmin = "AddAdmin";

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
  });

  const getAllAdmin = () => {
    adminController
      .getAllAdmin()
      .then((res) => {
        return res;
      })
      .then((res) => {

        if (res[0]?.dateofbirth == null) {
          res.dateofbirth = "dd/mm/yyyy";

          console.log("vcl");
        } else {
          res.dateofbirth = (res[0]?.dateofbirth).substring(0, 10);
          console.log("Test" + res.dateofbirth);
        }
        setAdmin(res);

      });
  };

  useEffect(() => {
    getAllAdmin();
  }, []);

  function JumpEditUser(username: any) {
    window.location.href = `detailuser/${username}`;
  }

  const DeleteUser = (id: any) => {
    userController
      .deleteUser(id)
      .then((res) => {
        toast.success("Xóa thành công !");
        console.log("res:" + res);
        getAllAdmin();
      })
      .catch(() => {
        toast.error("Xóa thất bại !");
      });
  };
  function reformatDate(dateStr: any) {
    var dArr = dateStr.split("-");  // ex input: "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(0); //ex output: "18/01/10"
  }
  const openModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      //  reset({ name: data.name, id: data.id });
      //  setUrl(data.image);
      modal.showModal();
    }
  };
  const closeModal = async (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };
  const saveModal = (id: string, data: FormValues) => {
    // closeModal(id);
    console.log("Data:"+JSON.stringify(data));
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
              QUẢN LÝ DANH SÁCH ADMIN
            </h2>
          </div>
          <div className="flex flex-col gap-[35px]">
            <div className="flex justify-between mb-7">
              <div className="items-center bg-[#EA4B48] rounded-md h-[46px] flex px-6">
                <button
                  className="flex gap-3"
                  onClick={() =>
                    openModal(idAddAdmin)
                  }
                >
                  <PlusSquare />
                  <p className="cursor-default text-white text-base font-bold ">
                    Thêm Admin
                  </p>
                </button>
              </div>

              <DialogAddAdmin
                id={idAddAdmin}
                onClose={() => closeModal(idAddAdmin)}
                onSave={handleSubmit((data: any) => {
                  saveModal(idAddAdmin, data);
                })}
                title="Thêm Admin"
                body={
                  <>
                    <div className="grid grid-cols-5 gap-8">
                      <div className="col-span-3 mt-[20px] mb-[20px] " >
                        <div className="flex gap-3  ">
                          <div className="flex flex-col gap-5 max-lg:gap-2">
                            <div className="h-[90px] w-[500px]">
                              <Controller
                                name="name"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message:
                                      "Không để trống",
                                  },
                                  minLength: {
                                    value: 4,
                                    message:
                                      "Ít nhất 4 ký tự",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "Nhiều nhất 25 kí tự",
                                  },
                                }}
                                render={({ field }) => (
                                  <>
                                    <label className="text-sm max-xl:text-xs max-lg:text-[10px]">
                                      Tên
                                    </label>
                                    <input
                                      className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                                      placeholder="Nhập vào tên"
                                      value={field.value}
                                      onChange={(e) => {
                                        const reg =
                                          /[!@#$%^&]/;
                                        const value =
                                          e.target
                                            .value;
                                        field.onChange(
                                          value.replace(
                                            reg,
                                            ""
                                          )
                                        );
                                      }}
                                      name="name"
                                    />
                                    {errors.name && (
                                      <p className="text-[11px] text-red-700 mt-0">
                                        {
                                          errors.name
                                            .message
                                        }
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 ">
                          <div className="flex flex-col gap-5 max-lg:gap-2">
                            <div className="h-[90px] w-[500px]">
                              <Controller
                                name="username"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message:
                                      "Không để trống",
                                  },
                                  minLength: {
                                    value: 4,
                                    message:
                                      "Ít nhất 4 ký tự",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "Nhiều nhất 25 kí tự",
                                  },
                                }}
                                render={({ field }) => (
                                  <>
                                    <label className="text-sm max-xl:text-xs max-lg:text-[10px]">
                                      Tên tài khoản
                                    </label>
                                    <input
                                      className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                                      placeholder="Nhập vào tên tài khoản"
                                      value={field.value}
                                      onChange={(e) => {
                                        const reg =
                                          /[!@#$%^&]/;
                                        const value =
                                          e.target
                                            .value;
                                        field.onChange(
                                          value.replace(
                                            reg,
                                            ""
                                          )
                                        );
                                      }}
                                      name="username"
                                    />
                                    {errors.username && (
                                      <p className="text-[11px] text-red-700 mt-0">
                                        {
                                          errors.username
                                            .message
                                        }
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </div>

                        </div>
                        <div className="flex gap-3 ">
                          <div className="flex flex-col gap-5 max-lg:gap-2">
                            <div className="h-[90px] w-[500px]">
                              <Controller
                                name="password"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message:
                                      "Không để trống",
                                  },
                                  minLength: {
                                    value: 4,
                                    message:
                                      "Ít nhất 4 ký tự",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "Nhiều nhất 25 kí tự",
                                  },
                                }}
                                render={({ field }) => (
                                  <>
                                    <label className="text-sm max-xl:text-xs max-lg:text-[10px]">
                                      Mật khẩu
                                    </label>
                                    <input
                                      className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                                      placeholder="Nhập vào mật khẩu"
                                      value={field.value}
                                      type="password"
                                      onChange={(e) => {
                                        const reg =
                                          /[!@#$%^&]/;
                                        const value =
                                          e.target
                                            .value;
                                        field.onChange(
                                          value.replace(
                                            reg,
                                            ""
                                          )
                                        );
                                      }}
                                      name="password"
                                    />
                                    {errors.password && (
                                      <p className="text-[11px] text-red-700 mt-0">
                                        {
                                          errors.password
                                            .message
                                        }
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </div>

                        </div>
                        <div className="flex gap-3 ">
                          <div className="flex flex-col gap-5 max-lg:gap-2">
                            <div className="h-[90px] w-[500px]">
                              <Controller
                                name="comfirmPassword"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message:
                                      "Không để trống",
                                  },
                                  minLength: {
                                    value: 4,
                                    message:
                                      "Ít nhất 4 ký tự",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "Nhiều nhất 25 kí tự",
                                  },
                                }}
                                render={({ field }) => (
                                  <>
                                    <label className="text-sm max-xl:text-xs max-lg:text-[10px]">
                                      Xác nhận mật khẩu
                                    </label>
                                    <input
                                      className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                                      placeholder="Xác nhận mật khẩu"
                                      value={field.value}
                                      type="password"
                                      onChange={(e) => {
                                        const reg =
                                          /[!@#$%^&]/;
                                        const value =
                                          e.target
                                            .value;
                                        field.onChange(
                                          value.replace(
                                            reg,
                                            ""
                                          )
                                        );
                                      }}
                                      name="comfirmPassword"
                                    />
                                    {errors.comfirmPassword && (
                                      <p className="text-[11px] text-red-700 mt-0">
                                        {
                                          errors.comfirmPassword
                                            .message
                                        }
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </div>

                        </div>
                        <div className="flex gap-3 ">
                          <div className="flex flex-col gap-5 max-lg:gap-2">
                            <div className="h-[90px] w-[500px]">
                              <Controller
                                name="email"
                                control={control}
                                rules={{
                                  required: {
                                    value: true,
                                    message:
                                      "Không để trống",
                                  },
                                  minLength: {
                                    value: 4,
                                    message:
                                      "Ít nhất 4 ký tự",
                                  },
                                  maxLength: {
                                    value: 25,
                                    message:
                                      "Nhiều nhất 25 kí tự",
                                  },
                                }}
                                render={({ field }) => (
                                  <>
                                    <label className="text-sm max-xl:text-xs max-lg:text-[10px]">
                                      Email
                                    </label>
                                    <input
                                      className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                                      placeholder="Nhập vào Email"
                                      value={field.value}
                                      onChange={(e) => {
                                        const reg =
                                          /[!#$%^&]/;
                                        const value =
                                          e.target
                                            .value;
                                        field.onChange(
                                          value.replace(
                                            reg,
                                            ""
                                          )
                                        );
                                      }}
                                      name="email"
                                    />
                                    {errors.email && (
                                      <p className="text-[11px] text-red-700 mt-0">
                                        {
                                          errors.email
                                            .message
                                        }
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </>
                }
              />
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
                    Id Admin
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
                    Giới tính
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    Ngày sinh
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 max-lg:px-[5px] max-lg:py-2"
                  >
                    SĐT
                  </th>

                </tr>
              </thead>

              {admin?.length > 0 ? (
                admin?.map((items: any) => {
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
                                <li>
                                  <button
                                    onClick={() => DeleteUser(items.id)}
                                    className="flex items-center gap-4"
                                  >
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
                            {items.id}
                          </th>
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
                            {items.dateofbirth != null
                              ? (reformatDate((items.dateofbirth).substring(0, 10)))
                              : (items.dateofbirth = "dd/mm/yyyy")}
                          </td>
                          <td
                            className="text-[#2e34e6] px-3 py-5 max-lg:py-3 justify-center">
                            {items.phonenumber}
                          </td>

                        </tr>
                      </tbody>
                    </>
                  );
                })
              ) : (
                <>
                  <tbody>
                    <tr className="bg-white border-b-[2px] border-[#E0E0E0] max-xl:text-sm max-lg:text-xs">
                      <th
                        scope="row"
                        className="px-3 py-5 max-lg:py-3 justify-center font-medium text-gray-900"
                      ></th>
                      <td className="px-3 py-5 max-lg:py-3 justify-center"></td>
                      <td className="px-3 py-5 max-lg:py-3 justify-center"></td>
                      <td className="px-3 py-5 max-lg:py-3 justify-center"></td>

                      <td className="px-3 py-5 max-lg:py-3 justify-center">
                        3999999
                      </td>
                      <td
                        className={`${status == "Hoạt động"
                          ? "text-[#00B207] px-3 py-5 max-lg:py-3 justify-center"
                          : "text-[#FF8A00] "
                          }`}
                      >
                        Hoạt động
                      </td>
                      <th
                        scope="row"
                        className="flex gap-2 items-center px-3 py-5 max-lg:py-3"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-[#EA4B48]  max-lg:w-[14px] max-lg:h-[14px] max-[940px]:w-3"
                        />
                        <div className="dropdown dropdown-right ">
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
                              <button className="flex items-center gap-4">
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
                      </th>
                    </tr>
                  </tbody>
                  <EmptyPage
                    title="Danh sách sản phẩm trống"
                    button="Thêm Ngay"
                  />
                </>
              )}
            </table>
          </div>
        </div>
      </div>
    </Container >
  );
}
