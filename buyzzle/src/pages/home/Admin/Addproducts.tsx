import { useEffect, useState } from 'react'
import Container from '../../../components/container/Container'
import Back from './Assets/TSX/Back'
// import ArrowDown from '../../../Assets/TSX/ArrowDown'
import UploadIMG from './Assets/TSX/UploadIMG'
// import { Images } from '../../../Assets/TS'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { storage } from '../../../Firebase/Config'
import { ref, uploadBytes } from 'firebase/storage'
import { appConfig } from '../../../configsEnv'
// import { v4 } from 'uuid'

export type FormValues = {
    productName: string;
    productPrice: number;
    productDesc: string;
    productQuantity: number;
    productImage: string;
    productDiscount: number;
}

export interface Cate {
    name: string,
    idcategory: number
}

export default function Addproducts() {

    const [images, setImages] = useState('')
    const [url, setUrl] = useState<string[]>([])

    // Tạo fuction handle thêm sản phẩm.
    const handleAddproduct = (data: FormValues) => {
        // console.log(data)
        const _data = {
            name: data.productName,
            price: data.productPrice,
            description: data.productDesc,
            quantity: data.productQuantity,
            discount: data.productDiscount,
        }

        // console.log("🚀 ~ file: Addproducts.tsx:33 ~ handleAddproduct ~ _data:", _data)

        axios.post(`${appConfig.apiUrl}/addproduct`, _data)
            .then(response => {
                console.log(response.config.data)
                return response
            }).then(async (responseData) => {
                alert('success')
                for (let i = 0; i < url.length; i++) {
                    await addImages(responseData?.data.id, url[i])
                }
                console.log("🚀 ~ file: Addproducts.tsx:38 ~ handleAddproduct ~ responseData:", responseData)
            }).catch(error => {
                console.log("🚀 ~ file: Addproducts.tsx:40 ~ handleAddproduct ~ error:", error)
            })

    }

    const addImages = async (id: number, url: string) => {

        const urlImages = {
            idproduct: id,
            url: url
        }
        await axios.post(`${appConfig.apiUrl}/addImagesByProductsID`, urlImages)
            .then(response => response.data)
    }

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<FormValues>({
        mode: 'all',
        defaultValues:
        {
            productName: '',
            productDesc: '',
            productImage: '',
            productPrice: 1,
            productQuantity: 1,
            productDiscount: 1
        },

    });


    const [categoty, setCategory] = useState<Cate[]>([])
    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = () => {
        axios.get('http://localhost:5000/buyzzle/product/allcategory')
            .then(response => response.data
            )
            .then(data => {
                // console.log(data)
                setCategory(data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadImageFile(images)
    }, [images])


    // img firebase
    const loadImageFile = async (images: any) => {

        for (let i = 0; i < images.length; i++) {
            const imageRef = ref(storage, `multipleFiles/${images[i].name}`)

            await uploadBytes(imageRef, images[i])
                .then(() => {
                    storage.ref('multipleFiles').child(images[i].name).getDownloadURL()
                        .then((url: any) => {
                            setUrl((prev) => (prev.concat(url)));
                            return url
                        })
                })
                .catch(err => {
                    alert(err)
                })

        }

    }
    const isDisabled = !(isValid && isDirty)
    return (
        <Container>
            <body className="body-filter container mx-auto">
                {/* back */}
                <div className='back h-[57px] mt-[46px] '>
                    <div className='flex gap-3 items-center'>
                        <div className='border-[1px] border-[#EA4B48] rounded-md py-4 px-4'>
                            <Back />
                        </div>
                        <div >
                            <p className='font-normal text-sm'>Quay lại danh sách sản phẩm</p>
                            <h2 className='uppercase text-[32px] font-bold'>Thêm Sản Phẩm</h2>
                        </div>
                    </div>
                </div>{/* end back */}

                <div className='mt-11 '>
                    <form >
                        <div className='grid grid-cols-2 gap-6'>
                            <div>
                                {/* Mô Tả Sản Phẩm */}
                                <div>
                                    <span className='text-[#000] text-2xl font-normal '>Mô Tả Sản Phẩm</span>
                                    {/* card */}
                                    <div className='card w-[100%] py-6 px-6 mt-2 rounded-md
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                        <Controller control={control} name='productName' rules={{
                                            required: {
                                                value: true,
                                                message: 'Bạn phải nhập thông tin cho trường dữ liệu này!'
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Tên sản phẩm phải lớn hơn 6 ký tự'
                                            }
                                        }} render={({ field }) => (
                                            <>
                                                <label htmlFor='name' className='text-[#4C4C4C] text-sm font-semibold mb-[8px]'>Tên Sản Phẩm*</label>
                                                {/* input addNameProducts */}
                                                <input
                                                    className={`focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%]
                                            ${!!errors.productName ? 'border-[2px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}`}
                                                    placeholder="Nhập tiêu đề sản phẩm"
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        const reg = /[0-9]/;
                                                        const value = e.target.value
                                                        field.onChange(value.replace(reg, ''));
                                                    }}
                                                />
                                                {!!errors.productName && <p className='text-red-700 mt-2'>{errors.productName.message}</p>}</>
                                        )} />
                                        {/* end input addNameProducts */}

                                        <Controller control={control} name='productDesc' rules={{
                                            required: {
                                                value: true,
                                                message: 'Bạn phải nhập thông tin cho trường dữ liệu này!'
                                            },
                                            maxLength: {
                                                value: 1000,
                                                message: 'Mô tả không được vượt quá 300 ký tự!'
                                            },
                                            minLength: {
                                                value: 20,
                                                message: 'Mô tả sản phẩm tối thiểu 20 ký tự!'
                                            }

                                        }}
                                            render={({ field }) => (
                                                <>
                                                    <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px]'>Mô Tả Chi Tiết Sản Phẩm*</p>
                                                    {/* input addNameProducts */}
                                                    <textarea className={`focus:outline-none text-[#333333] text-base font-medium 
                                                border-[1px] border-[#FFAAAF] rounded-[6px] px-[10px] py-[7px] w-[100%] h-[251px] 
                                                ${!!errors.productDesc ? 'border-[2px] border-red-900' : ' border-[1px] border-[#FFAAAF]'}
                                                `}
                                                        placeholder='Nhập mô tả chi tiết sản phẩm <HTML>'
                                                        maxLength={1000}
                                                        rows={4} cols={50}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    >
                                                    </textarea>
                                                    {/* end input addNameProducts */}
                                                </>
                                            )}
                                        />
                                        {!!errors.productDesc && <p className='text-red-700 mt-2'>{errors.productDesc.message}</p>}

                                    </div>
                                </div>
                                {/* Danh Mục Sản Phẩm */}
                                <div className='mt-7'>
                                    <span className='text-[#000] text-2xl font-normal '>Danh Mục Sản Phẩm</span>
                                    {/* card */}
                                    <div className='card w-[100%] py-6 px-6 mt-2 rounded-md
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                        <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px]'>Danh Mục Sản Phẩm*</p>
                                        {/* Dropdown */}
                                        <div className=" w-[100%] flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
                                            <select className="w-[100%] p-2.5 text-gray-500 bg-white py-[14px] outline-none ">

                                                {
                                                    categoty.map(e => {
                                                        return <option value={e.idcategory}>{e.name}</option>
                                                    })
                                                }
                                                {/* <option>Thiết bị điện da dụng</option>
                                                <option>Giày dép da</option>
                                                <option>Máy ảnh</option>
                                                <option>Thời trang nam</option>
                                                <option>Thiết bị điện tử</option>
                                                <option>Nhà cửa đời sống</option>
                                                <option>Sắc đẹp</option> */}
                                            </select>
                                        </div>
                                        {/* end input addNameProducts */}

                                        <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px]'>Tag*</p>
                                        {/* Dropdown */}
                                        <div className=" w-[100%] flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
                                            <select className="w-[100%] p-2.5 text-gray-500 bg-white py-[14px] outline-none ">
                                                <option>key-word tìm kiếm / key-word tìm kiếm 1</option>
                                                <option>key-word tìm kiếm 2 / key-word tìm kiếm 3</option>
                                            </select>
                                        </div>
                                        {/* end input addNameProducts */}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/* Ảnh sản phẩm */}
                                <div>
                                    <span className='text-[#000] text-2xl font-normal'>Ảnh Sản Phẩm</span>
                                    {/* card */}
                                    <div className='card w-[100%] py-4 px-9 mt-2 flex items-center rounded-md
                                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>

                                        <Controller control={control} name='productImage' render={({ }) => (
                                            <>
                                                {/* form upload img */}
                                                <form className='max-w-max items-center'>
                                                    <label htmlFor="images">
                                                        <div className='outline-dashed outline-2 outline-offset-2 outline-[#EA4B48] py-7 px-9 cursor-pointer'>
                                                            <input type="file"
                                                                // onChange={field.onChange}
                                                                onChange={(e: any) => setImages(e.target.files)}
                                                                id='images' multiple className='hidden ' />
                                                            <UploadIMG />
                                                            <div id="images" className='text-center mt-2'>
                                                                <p className='text-[#5D5FEF] text-center -tracking-tighter font-bold'>Click to upload
                                                                    <p className='text-[#1A1A1A] font-normal text-sm tracking-widest'>or drag and drop</p></p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </form>{/* end form upload img */}
                                                <div className='justify-center flex flex-1'>
                                                    <div className='inline-grid grid-cols-3 gap-4'>

                                                        {
                                                            url.map(e => {
                                                                return <div><img src={e} alt="imageproduct6" width={80} height={80} className='rounded-md' /></div>
                                                            })
                                                        }

                                                        {/* <div
                                                            style={{ borderTopColor: "transparent" }}
                                                            className="w-16 h-16 border-4 border-red-400  mx-auto border-double rounded-full animate-spin"
                                                        /> */}




                                                    </div>
                                                </div>
                                            </>
                                        )} />
                                    </div>
                                </div>
                                {/* Giá và số lượng sản phẩm */}
                                <div className='mt-7'>
                                    <span className='text-[#000] text-2xl font-normal '>Giá & Số Lượng</span>
                                    {/* card */}
                                    <div className='card w-[100%] py-6 px-6 mt-2 rounded-md
                                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                        <div className='grid grid-cols-6 gap-5'>
                                            <Controller control={control} name='productPrice' rules={{
                                                required: {
                                                    value: true,
                                                    message: 'Bạn phải nhập giá cho sản phẩm này!'
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    message: 'Giá sản phẩm tối đa 10 chữ số!'
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: 'Giá sản phẩm tối thiểu 3 chữ số!'
                                                }
                                            }}
                                                render={({ field }) => (
                                                    <>
                                                        <div className='col-span-4'>
                                                            <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px]'>Giá Sản phẩm*</p>
                                                            <div className={`flex justify-between items-center rounded-[6px] px-[15px] py-[12px]
                                                            ${!!errors.productPrice ? 'border-[1px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}
                                                            `}>
                                                                <input
                                                                    className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]"
                                                                    placeholder="000.000"
                                                                    value={field.value}
                                                                    // onChange={(e) => {
                                                                    //     const reg = /[^1-9]/g
                                                                    //     const value = e.target.value
                                                                    //     field.onChange(value.replace(reg, ''))
                                                                    // }}
                                                                    onChange={field.onChange}
                                                                />
                                                                <p className='text-[#7A828A] font-bold ml-4 cursor-default'>VNĐ</p>
                                                            </div>
                                                            {errors.productPrice && <p className='text-red-700 mt-2'>{errors.productPrice.message}</p>}
                                                        </div>
                                                    </>
                                                )}
                                            />
                                            <Controller control={control} name='productDiscount' rules={{
                                                required: {
                                                    value: true,
                                                    message: ''
                                                },
                                                maxLength: {
                                                    value: 2,
                                                    message: 'Giảm sản phẩm tối đa 100%!'
                                                },
                                                minLength: {
                                                    value: 1,
                                                    message: 'Giá sản phẩm tối thiểu 1 chữ số!'
                                                }
                                            }}
                                                render={({ field }) => (
                                                    <>
                                                        <div className='col-span-2'>
                                                            <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px]'>Giảm giá Sản phẩm*</p>
                                                            <div className={`flex justify-between items-center rounded-[6px] px-[15px] py-[12px]
                                                            ${!!errors.productDiscount ? 'border-[1px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}
                                                            `}>
                                                                <input
                                                                    className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]"
                                                                    placeholder="000.000"
                                                                    value={field.value}
                                                                    maxLength={3}
                                                                    // onChange={(e) => {
                                                                    //     const reg = /[^1-9]/g
                                                                    //     const value = e.target.value
                                                                    //     field.onChange(value.replace(reg, ''))
                                                                    // }}
                                                                    onChange={field.onChange}

                                                                />
                                                                <p className='text-[#7A828A] font-bold ml-4 cursor-default'>%</p>
                                                            </div>
                                                            {errors.productDiscount && <p className='text-red-700 mt-2'>{errors.productDiscount.message}</p>}
                                                        </div>
                                                    </>
                                                )}
                                            />
                                        </div>

                                        <Controller control={control} name='productQuantity' rules={{
                                            required: {
                                                value: true,
                                                message: 'Bạn phải nhập số lượng cho sản phẩm này!'
                                            },
                                            maxLength: {
                                                value: 4,
                                                message: 'Số lượng sản phẩm quá nhiều! Chỉ tối đa đến hàng nghìn!'
                                            },
                                        }}
                                            render={({ field }) => (
                                                <>
                                                    <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px]'>Số Lượng Sản Phẩm*</p>
                                                    <input
                                                        className={`focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%] rounded-[6px] px-[15px] py-[12px]
                                                    ${!!errors.productQuantity ? 'border-[1px] border-red-900' : 'border-[1px] border-[#FFAAAF]'} `}
                                                        placeholder="000.000"
                                                        value={field.value}
                                                        onChange={(e) => {
                                                            const reg = /[^1-9]/g
                                                            const value = e.target.value
                                                            field.onChange(value.replace(reg, ''))
                                                        }}
                                                    />
                                                    {errors.productQuantity && <p className='text-red-700 mt-2'>{errors.productQuantity.message}</p>}
                                                </>
                                            )}
                                        />

                                    </div>


                                </div>
                                {/* tình trạng sản phẩm */}
                                <div className='mt-7'>
                                    <span className='text-[#000] text-2xl font-normal'>Tình trạng sản phẩm</span>
                                    {/* card */}
                                    <div className='card w-[100%] py-4 px-9 mt-2 rounded-md
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                        <p className='text-[#4C4C4C] text-sm font-semibold mb-[18px]'>Tình trạng sản phẩm*</p>
                                        <div className='flex text-center'>
                                            <h3 className='text-[#4C4C4C] font-semibold'>Ẩn</h3>
                                            {/* Swich */}
                                            <div className='Switch'>
                                                <input
                                                    className="mx-3 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-[#EA4B48] after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                    type="checkbox"
                                                    role="switch"
                                                    id="flexSwitchCheckDefault" />
                                            </div>{/* end  Swich */}
                                            <h3 className='text-[#5D5FEF] font-semibold'>Đăng</h3>
                                        </div>

                                    </div>
                                </div>
                                {/* button */}
                                <div className='flex w-[50%] justify-between mt-6'>
                                    <div className='flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#EA4B48] border-[1px] justify-evenly cursor-pointer'>
                                        <Link to='/' >
                                            <button className='text-center text-base font-bold text-[#1A1A1A] '>
                                                Hủy bỏ
                                            </button>
                                        </Link>
                                    </div>

                                    <div className={`flex items-center w-[150px] rounded-md h-[46px] transition 
                                    duration-150 justify-evenly 
                                ${isDisabled ? 'bg-[#aeaeae] cursor-not-allowed' : 'bg-[#EA4B48] hover:bg-[#ff6d65] cursor-pointer'}
                                    `}>
                                        <button disabled={isDisabled} onClick={handleSubmit((data: any) => {
                                            handleAddproduct(data)
                                        })} className={`text-center text-base font-bold text-[#FFFFFF] 
                                        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                                        `}>
                                            Thêm sản phẩm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </body >
        </Container >
    )
}
