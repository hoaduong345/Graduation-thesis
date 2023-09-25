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
import RemoveCate from "../Assets/TSX/RemoveCate";
import Edit from "../Assets/TSX/Edit";
import UploadIMG from "../Assets/TSX/UploadIMG";
import { toast } from "react-toastify";
import LogoCate from "../Assets/TSX/logoCateAdmin";
import AddCateBtn from "../Assets/TSX/AddCateAdmin";


export interface Cate {
    id: number,
    name: string,
}

function Category() {

    const [category, setCategory] = useState<Cate>({} as Cate);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        setCategory({ ...category, name: e.target.value });
    };

    const handleSubmit = () => {
        closeModal()
        if (category.id != 0 && category.id != undefined) {
            axios.put(`http://localhost:5000/buyzzle/product/updatecategory/${category.id}`, { name: category.name })
                .then(response => {
                    return response
                })
                .then(data => {
                    toast.success('Update Complete!!')
                    console.log(data);
                    getList()
                    setCategory({ name: '', id: 0 })
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Xử lý lỗi nếu có

                });
        } else {
            axios.post('http://localhost:5000/buyzzle/product/addcategory', { name: category.name })
                .then(response => {
                    return response
                })
                .then(data => {
                    toast.success('New Category Complete!!')
                    console.log(data);
                    getList()
                    setCategory({ name: '', id: 0 })
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Xử lý lỗi nếu có

                });
        }

    };

    const remove = (id: number) => {
        axios.delete(`http://localhost:5000/buyzzle/product/deletecategory/${id}`)
            .then(response => {
                return response
            })
            .then(() => {
                toast.error('Successfully')
                getList()
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error)
            });
    };

    // const update = (cate: Cate) => {
    //     setCategory(cate)
    // }


    const [categorys, setCategorys] = useState<Cate[]>([])

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        fetch("http://localhost:5000/buyzzle/product/allcategory")
            .then((data) => {
                const bien = data.json()
                return bien
            }).then((data) => {
                closeModal()
                setCategorys(data)
            }).catch((error) => {
                console.log(error)
            })
    }

    //showdialog demo
    const openModal = (cate: Cate) => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modal) {
            setCategory(cate)
            modal.showModal();
        }
    };

    const closeModal = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };
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
                                <div
                                    className="Search-input-headerCenter items-center flex
                   py-[3px] px-[6px] border-[1px] border-[#FFAAAF] rounded-md">
                                    <div className="mb-2">
                                        <Search />
                                    </div>
                                    <input
                                        className=" rounded-lg focus:outline-none text-lg relative pr-7 flex-1 pl-3 max-xl:text-sm"
                                        placeholder="Tìm kiếm..."
                                    />
                                </div>
                                <div className='flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer'>
                                    <Download />
                                    <button className='text-center text-base font-bold text-[#EA4B48] '>
                                        Xuất excel
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-10 items-center">
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

                            <div className="items-center flex gap-3 px-6">
                                <button className="" onClick={() => openModal(category)}>
                                    <Plus />
                                </button>
                                <p className="cursor-default text-[#7A828A] text-base font-bold">THÊM DANH MỤC</p>
                                <div>
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="bg-white relative flex flex-col p-[60px]">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                                            </form>
                                            <div className="flex flex-col gap-10">
                                                <div className="flex items-center">
                                                    <LogoCate />
                                                    <h3 className="font-bold text-2xl">DANH MỤC SẢN PHẨM</h3>
                                                </div>

                                                <div className="grid grid-cols-5 gap-8">
                                                    <div className="col-span-3">
                                                        <div className="flex gap-3 ">
                                                            <div className="flex flex-col gap-5">
                                                                <div>
                                                                    <label htmlFor="" className="text-sm">Tiêu Đề Danh Mục*</label>
                                                                    <input
                                                                        className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                            `}
                                                                        placeholder="Nhập tiêu đề danh mục"
                                                                        onChange={handleChange}
                                                                        name="name"
                                                                        value={category.name}

                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="" className="text-sm">Chuỗi Cho Đường Dẫn Tĩnh*</label>
                                                                    <input
                                                                        className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                            `}
                                                                        placeholder="Nhập chuỗi cho đường dẫn tĩnh"

                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="" className="text-sm">Mô tả Danh Mục</label>
                                                                    <input
                                                                        className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                            `}
                                                                        placeholder="Nhập mô tả danh mục"

                                                                    />
                                                                </div>
                                                            </div>



                                                        </div>
                                                    </div>
                                                    <div className="col-span-2 flex flex-col gap-12">
                                                        <div className='max-w-max items-center'>
                                                            <label htmlFor="images">
                                                                <div className='outline-dashed outline-2 outline-offset-2 outline-[#EA4B48] py-7 px-9 cursor-pointer'>
                                                                    <input type="file"
                                                                        // onChange={(e: any) => setImages(e.target.files)}
                                                                        id='images' multiple className='hidden ' />
                                                                    <UploadIMG />
                                                                    <div id="images" className='text-center mt-2'>
                                                                        <p className='text-[#5D5FEF] text-center text-base -tracking-tighter font-bold'>Click to upload
                                                                            <p className='text-[#1A1A1A] font-normal text-base tracking-widest'>or drag and drop</p></p>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <div className="flex gap-2 items-center ">
                                                            <button onClick={handleSubmit} className="text-base font-bold flex gap-3 px-[50px] py-3 border-[#EA4B48] rounded-md border-[1px]">
                                                                <AddCateBtn />
                                                                Xác Nhận
                                                            </button>
                                                            <button className="p-3 text-white text-base bg-[#EA4B48] rounded-md"
                                                                onClick={closeModal}
                                                            >Hủy</button>
                                                        </div>
                                                    </div>

                                                </div>




                                            </div>


                                        </div>
                                    </dialog>
                                </div>
                            </div>

                            <div className="grid grid-cols-10 h-20">
                                {
                                    categorys.map((e) => {
                                        return (

                                            <>
                                                <div className="col-span-3 border-[#e0e0e0] border-y-[1px] items-center flex justify-between px-6">
                                                    <div className=" flex gap-[20px]">
                                                        <button>
                                                            <Plus />
                                                        </button>
                                                        <div className="dropdown dropdown-left ">
                                                            <label tabIndex={0}>
                                                                <Handle />
                                                            </label>
                                                            <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box w-52
                                                shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                                                                <li>
                                                                    <button onClick={() => openModal(e)} className="flex items-center gap-4">
                                                                        <Edit />
                                                                        <p className="text-[#EA4B48] text-sm font-medium">Sửa</p>
                                                                    </button>
                                                                </li>
                                                                <li>

                                                                    <button onClick={() => remove(e.id)} className="flex items-center gap-4">
                                                                        <RemoveCate />
                                                                        <p className="text-[#EA4B48] text-sm font-medium">Xóa</p>
                                                                    </button>

                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <input type="checkbox" />
                                                    </div>
                                                    <div>
                                                        <img src={Images.cateAD} alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-span-5 border-[#e0e0e0] h-20 border-[1px] items-center gap-5 py-[5%] pl-[5%]">
                                                    <p className="text-[16px] font-bold my-auto">{e.name}</p>
                                                </div>
                                                <div className="col-span-2 border-[#e0e0e0] border-y-[1px]">
                                                    <div className='flex text-center w-[37%] justify-start items-center gap-5 py-[25px] pl-[25px]'>
                                                        <h3 className='font-semibold'>Ẩn</h3>

                                                        <div className="form-control">
                                                            <input type="checkbox" className="toggle toggle-error" />
                                                        </div>
                                                        <h3 className='font-semibold'>Hiện</h3>
                                                    </div>
                                                </div>

                                            </>

                                        )
                                    })
                                }

                            </div>

                        </div>

                    </div>
                </div>

            </Container>


        </>

    )
}

export default Category