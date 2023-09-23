import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../../../../components/container/Container";
import SitebarAdmin from "../Sitebar/Sitebar";
import Search from "../../../../Assets/TSX/Search";
import Download from "../Assets/TSX/Download";
import Delete from "../Assets/TSX/Delete";
import Line from "../Assets/TSX/Line";
import { Images } from "../../../../Assets/TS";
import Plus from "../../../../Assets/TSX/Plus";
import Handle from "../Assets/TSX/bacham";


export interface Cate {
    id: number,
    name: string,
}

function Category() {

    // const [category, setCategory] = useState<Cate>({} as Cate);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    //     setCategory({ ...category, name: e.target.value });
    // };

    // const handleSubmit = () => {
    //     if (category.id != 0 && category.id != undefined) {
    //         axios.put(`http://localhost:5000/buyzzle/product/updatecategory/${category.id}`, { name: category.name })
    //             .then(response => {

    //                 return response
    //             })
    //             .then(data => {
    //                 console.log(data);
    //                 getList()
    //                 setCategory({ name: '', id: 0 })
    //             })
    //             .catch(error => {
    //                 console.error('Error:', error);
    //                 // Xử lý lỗi nếu có

    //             });
    //     } else {
    //         axios.post('http://localhost:5000/buyzzle/product/addcategory', { name: category.name })
    //             .then(response => {
    //                 return response
    //             })
    //             .then(data => {
    //                 console.log(data);
    //                 getList()
    //                 setCategory({ name: '', id: 0 })
    //             })
    //             .catch(error => {
    //                 console.error('Error:', error);
    //                 // Xử lý lỗi nếu có

    //             });
    //     }

    // };

    // const remove = (id: number) => {
    //     if (confirm('  you remove item sure!')) {
    //         axios.delete(`http://localhost:5000/buyzzle/product/deletecategory/${id}`)
    //             .then(response => {

    //                 return response
    //             })
    //             .then(data => {
    //                 console.log(data);
    //                 getList()
    //             })
    //             .catch(error => {
    //                 console.error('Error:', error);
    //                 alert(error)
    //             });

    //     }

    // };

    // const update = (cate: Cate) => {
    //     setCategory(cate)
    // }


    // const [categorys, setCategorys] = useState<Cate[]>([])

    // useEffect(() => {
    //     getList()
    // }, [])

    // const getList = () => {
    //     fetch("http://localhost:5000/buyzzle/product/allcategory")
    //         .then((data) => {
    //             const bien = data.json()
    //             return bien

    //         }).then((data) => {
    //             console.log(data)
    //             setCategorys(data)

    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }

    return (
        <>
            <Container>
                {/* <div>
                    <div>
                        <h1 className="text-[32px] font-bold py-[50px]">DANH MỤC</h1>
                    </div>

                    <div className="flex gap-[100px]" >
                        <div className="flex flex-col gap-[10px]" >
                            <input onChange={handleChange} className="p-[16px] border-[1px] rounded-md border-[#FFAAAF]" value={category.name} type="text" name="name" placeholder="Tên Danh Mục" />
                            <button onClick={handleSubmit} type="button" className="p-[16px] text-white border-[1px] rounded-md border-[#FFAAAF] bg-[#00B207]">{category.id == 0 || category.id == undefined ? 'Thêm' : 'Sửa'}</button>
                        </div>

                        <div>
                            {
                                categorys.map((e) => {
                                    return (

                                        <table className="w-[100%]">
                                            <tr>
                                                <td className="p-[8px] border-[1px] ">{e.id}</td>
                                                <td className="p-[8px] border-[1px]">{e.name}</td>
                                                <td className="p-[8px] border-[1px]">
                                                    <button onClick={() => remove(e.id)}>Xóa</button>
                                                </td>
                                                <td className="p-[8px] border-[1px]">
                                                    <button onClick={() => update(e)}>Sửa</button>
                                                </td>
                                            </tr>
                                        </table>

                                    )
                                })
                            }

                        </div>
                    </div>

                </div> */}

                <div className='grid grid-cols-5'>
                    <div className="col-span-1 max-2xl:hidden">
                        <SitebarAdmin />
                    </div>
                    <div className='content-right-filter mt-[34px] col-span-4 max-2xl:col-span-1 flex flex-col gap-[50px]'>

                        <div>
                            <h2 className="txt-filter font-bold text-[#1A1A1A] text-3xl" >
                                QUẢN LÝ DANH MỤC SẢN PHẨM
                            </h2>
                        </div>

                        <div className="flex flex-col gap-[27px]">
                            <div className="flex gap-[24px]">
                                <div className="flex gap-[10px] w-[312px] border-[#FFAAAF] border-[1px] rounded-md p-[13px]">
                                    <Search />
                                    <input className="outline-none border-none w-[80%]" type="text" placeholder="Tìm kiếm thông tin sản phẩm..." />
                                </div>
                                <div className="flex gap-[10px] p-[10px] border-[#EA4B48] border-[1px] rounded-md">
                                    <Download />
                                    <button className="outline-none border-none text-[#EA4B48] font-bold text-[16px]">Xuất Excel</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-10">
                                <div className="col-span-1 py-[15px] pl-[35px]">
                                    <Delete />
                                </div>
                                <div className="col-span-2">
                                    <Line />

                                </div>
                                <div className="flex gap-[32px] col-span-5 ">
                                    <Line />
                                    <p className=" pt-[12px] text-[16px]">Tên</p>
                                </div>
                                <div className="flex gap-[72px] col-span-2">
                                    <Line />
                                    <p className="pt-[12px] text-[16px]">Trạng thái</p>
                                </div>

                            </div>

                            <div className="grid grid-cols-10">
                                <div className="col-span-3 border-[#e0e0e0] border-y-[1px] px-[20px] flex justify-between">
                                    <div className="py-[30px] flex gap-[20px]">
                                        <button>
                                            <Plus />
                                        </button>
                                        <button>
                                            <Handle />
                                            <button id="dropdownLeftButton" data-dropdown-toggle="dropdownLeft" data-dropdown-placement="left" className="mb-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><svg className="w-2.5 h-2.5 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                            </svg>Dropdown left</button>

                                            {/* <!-- Dropdown menu --> */}
                                            <div id="dropdownLeft" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLeftButton">
                                                    <li>
                                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                                    </li>
                                                </ul>
                                            </div>

                                        </button>
                                        <input type="checkbox" />
                                    </div>
                                    <div className="py-[15px]">
                                        <img src={Images.cateAD} alt="" />
                                    </div>

                                </div>
                                <div className="col-span-5 border-[#e0e0e0] p-[25px] border-[1px]">

                                    <p className="text-[16px] font-bold">Thiết bị điện tử</p>
                                </div>
                                <div className="col-span-2 border-[#e0e0e0] border-y-[1px] py-[25px] px-[40px]">
                                    <div className='flex text-center w-[37%] justify-start gap-5'>
                                        <h3 className='font-semibold'>Ẩn</h3>

                                        <div className="form-control">
                                            <input type="checkbox" className="toggle toggle-error" />
                                        </div>
                                        <h3 className='font-semibold'>Hiện</h3>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </Container>
        </>
    )
}

export default Category