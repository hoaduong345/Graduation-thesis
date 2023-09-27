import React, { useState, useRef, useEffect } from 'react'
import { Products } from '../../User/FilterPage/FiltersPage';
import { Link, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { appConfig } from '../../../../configsEnv';
import UploadIMG from '../Assets/TSX/UploadIMG';
import { useQuery } from '@tanstack/react-query';
import { Editor } from '@tinymce/tinymce-react';
import { productController } from '../../../../Controllers/ProductsController';
import { toast } from 'react-toastify'
import { imagesController } from '../../../../Controllers/ImagesController';
import { storage } from '../../../../Firebase/Config';
import { ref, uploadBytes } from 'firebase/storage';
import { categoryController } from '../../../../Controllers/CategoryController';
import RemoveIMG from '../../../../Assets/TSX/RemoveIMG';

export type FormValues = {
    name: string;
    price: number;
    description: string;
    quantity: number;
    productImage: string;
    discount: number;
    categoryID: number
}

export interface Cate {
    name: string,
    id: number
}

export default function EditProductMap() {

    const [editProduct, setEditProduct] = useState<FormValues>()
    const [images, setImages] = useState('')
    const [url, setUrl] = useState<string[]>([])
    const editorRef = useRef<any>(null);
    const [categoty, setCategory] = useState<Cate[]>([])
    const [editImages, setEditImages] = useState<string[]>([])

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isDirty, isValid },
        register
    } = useForm<FormValues>({
        mode: 'all',
        defaultValues:
        {
            name: '',
            price: 1,
            description: "",
            discount: 1,
        },
    });

    const handleRemoveOnlyIMG = (id: number) => {
        imagesController.remove(id).then((_) => {
            getListIMG()
            console.log(id)
        }).catch((err) => {
            console.log("🚀 ~ file: EditProductMap.tsx:62 ~ imagesController.remove ~ err:", err)
        })
    }

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = () => {
        categoryController.getAll().then((res) => {
            setCategory(res.data)
        }).catch(err => console.log(err))
    }
    console.log("🚀 ~ file: EditProductMap.tsx:57 ~ categoty:", categoty)

    const isDisabled = !(isValid && isDirty)


    const idProduct = useParams()
    console.log("🚀 ~ file: EditProductMap.tsx:70 ~ idProduct:", idProduct)
    const id = Number(idProduct.id)

    const submitData = (data: any) => {
        console.log(data);
        productController.update(id, data).then(async (responseData) => {
            console.log("🚀 ~ file: EditProductMap.tsx:90 ~ productController.update ~ responseData:", responseData)
            toast.success('Sua sanr phaarm thanhf coong !', {
                position: "bottom-right"
            })
            for (let i = 0; i < url.length; i++) {
                await updateImages(responseData?.data.id, url[i])
            }
            reset({})
        }).catch(() => {
            toast.error('Sua sanr phaarm that bai !')
        })
    }

    const updateImages = async (id: number, url: string) => {
        const urlImages = {
            idproduct: id,
            url: url
        }
        await axios.post(`${appConfig.apiUrl}/addImagesByProductsID`, urlImages)
            .then(response => response.data)

    }
    const getListIMG = () => {
        axios.get(`${appConfig.apiUrl}/chitietproduct/${id}`)
            .then((detailForm) => {
                return detailForm
            })
            .then((detailForm) => {
                setEditProduct(detailForm.data)
                setEditImages(detailForm.data.ProductImage)
            }).catch(error => {
                console.log("🚀 ~ file: Detailproducts.tsx:27 ~ .then ~ error:", error)
            })
    }
    useEffect(() => {
        getListIMG();
    }, [])


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

    const onChangeInput = (e: any) => {
        setEditProduct(e.target.value)
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitData)}>
                <div className='grid grid-cols-2 gap-6'>
                    <div>
                        {/* Mô Tả Sản Phẩm */}
                        <div>
                            <span className='text-[#000] text-2xl font-normal '>Mô Tả Sản Phẩm</span>
                            {/* card */}
                            <div className='card w-[100%] py-6 px-6 mt-2 rounded-md
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                <Controller control={control} name='name' rules={{
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
                                            ${!!errors.name ? 'border-[2px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}`}
                                            placeholder="Nhập tiêu đề sản phẩm"
                                            value={editProduct?.name}
                                            {...register("name")}
                                            onChange={onChangeInput}
                                        />
                                        {!!errors.name && <p className='text-red-700 mt-2'>{errors.name.message}</p>}</>
                                )} />
                                {/* end input addNameProducts */}

                                {/* <Controller control={control} name='description' rules={{
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
                                {/* <textarea className={`focus:outline-none text-[#333333] text-base font-medium 
                                                border-[1px] border-[#FFAAAF] rounded-[6px] px-[10px] py-[7px] w-[100%] h-[251px] 
                                                ${!!errors.description ? 'border-[2px] border-red-900' : ' border-[1px] border-[#FFAAAF]'}
                                                `}
                                                placeholder='Nhập mô tả chi tiết sản phẩm <HTML>'
                                                maxLength={1000}
                                                rows={4} cols={50}
                                                value={editProduct?.description}
                                                {...register('description')}
                                                onChange={onChangeInput}
                                            >
                                            </textarea>
                                            {/* end input addNameProducts 
                                        </>
                                    )}
                                />
                                {!!errors.description && <p className='text-red-700 mt-2'>{errors.description.message}</p>} */}

                                <Controller control={control} name='description' render={({ field }) => (
                                    <>
                                        <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px]'>Mô Tả Chi Tiết Sản Phẩm*</p>
                                        <Editor
                                            apiKey="i6krl4na00k3s7n08vuwluc3ynywgw9pt6kd46v0dn1knm3i"
                                            onInit={(evt, editor) => (editorRef.current = editor)}
                                            onEditorChange={(e) => field.onChange(e)}
                                            value={field.value}

                                            {...register('description')}
                                            init={{

                                                height: 500,
                                                menubar: false,
                                                font_size_formats: '18pt 24pt 36pt 48pt',
                                                plugins: [
                                                    'advlist',
                                                    'autolink',
                                                    'link',
                                                    'image',
                                                    'lists',
                                                    'charmap',
                                                    'preview',
                                                    'anchor',
                                                    'pagebreak',
                                                    'searchreplace',
                                                    'wordcount',
                                                    'visualblocks',
                                                    'visualchars',
                                                    'code',
                                                    'fullscreen',
                                                    'insertdatetime',
                                                    'media',
                                                    'table',
                                                    'emoticons',
                                                    'template',
                                                    'help',
                                                ],
                                                toolbar:
                                                    'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:22px;fontsize }',
                                            }}
                                        />
                                    </>
                                )} />

                            </div>
                        </div>
                        {/* Danh Mục Sản Phẩm */}
                        <div className='mt-7'>
                            <span className='text-[#000] text-2xl font-normal '>Danh Mục Sản Phẩm</span>
                            {/* card */}
                            <div className='card w-[100%] py-6 px-6 mt-2 rounded-md
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                <Controller control={control} name='categoryID' render={({ }) => (
                                    <>
                                        <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px]'>Danh Mục Sản Phẩm*</p>
                                        {/* Dropdown */}
                                        <div className=" w-[100%] flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
                                            <select className="w-[100%] p-2.5 text-gray-500 bg-white py-[14px] outline-none "
                                                {...register('categoryID')}
                                            >

                                                {
                                                    categoty.map(e => {
                                                        return <option value={e.id}>{e.name}</option>
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
                                    </>
                                )}


                                />

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
                            <div className='card w-[100%] py-4 px-9 mt-2 flex 
                                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>

                                <Controller control={control} name='productImage' render={({ }) => (
                                    <>
                                        {/* form upload img */}
                                        <div className='flex'>
                                            <div className='max-w-max items-center'>
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
                                            </div>{/* end form upload img */}
                                            <div className='justify-center flex flex-1'>
                                                <div className='inline-grid grid-cols-3 gap-4'>

                                                    {
                                                        editImages.map(e => {
                                                            return (
                                                                <>
                                                                    <div className='relative'>
                                                                        <div className='group relative'>
                                                                            <img src={e.url} alt="imageproduct6" width={80} height={80} className='rounded-md' />
                                                                            <div className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden rounded-md bg-gray-900 bg-fixed 
                                                            opacity-0 transition duration-300 ease-in-out group-hover:opacity-20'>
                                                                            </div>
                                                                            <div className='transition duration-300 ease-in-out bottom-0 left-0 right-0 top-0 opacity-0 group-hover:opacity-100 absolute'
                                                                            >
                                                                                <button onClick={() => handleRemoveOnlyIMG(e.id)}>
                                                                                    <RemoveIMG />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        })
                                                    }

                                                    {
                                                        url.map(e => {
                                                            return (
                                                                <>
                                                                    <div className='relative'>
                                                                        <div className='group relative'>
                                                                            <img src={e} alt="imageproduct6" width={80} height={80} className='rounded-md' />
                                                                            <div className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden rounded-md bg-gray-900 bg-fixed 
                                                                    opacity-0 transition duration-300 ease-in-out group-hover:opacity-20'>
                                                                            </div>
                                                                            <div className='transition duration-300 ease-in-out bottom-0 left-0 right-0 top-0 opacity-0 group-hover:opacity-100 absolute'
                                                                                onClick={() => console.log('an không ?')}>
                                                                                <RemoveIMG />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        })
                                                    }
                                                </div>
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
                                    <Controller control={control} name='price' rules={{
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
                                                            ${!!errors.price ? 'border-[1px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}
                                                            `}>
                                                        <input
                                                            className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]"
                                                            placeholder="000.000"
                                                            value={editProduct?.price}
                                                            {...register('price')}
                                                            onChange={onChangeInput}
                                                        // onChange={(e) => {
                                                        //     const reg = /[^1-9]/g
                                                        //     const value = e.target.value
                                                        //     field.onChange(value.replace(reg, ''))
                                                        // }}
                                                        />
                                                        <p className='text-[#7A828A] font-bold ml-4 cursor-default'>VNĐ</p>
                                                    </div>
                                                    {errors.price && <p className='text-red-700 mt-2'>{errors.price.message}</p>}
                                                </div>
                                            </>
                                        )}
                                    />
                                    <Controller control={control} name='discount' rules={{
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
                                                            ${!!errors.discount ? 'border-[1px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}
                                                            `}>
                                                        <input
                                                            className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]"
                                                            placeholder="000.000"
                                                            maxLength={3}
                                                            // onChange={(e) => {
                                                            //     const reg = /[^1-9]/g
                                                            //     const value = e.target.value
                                                            //     field.onChange(value.replace(reg, ''))
                                                            // }}
                                                            value={editProduct?.discount}
                                                            {...register('discount')}
                                                            onChange={onChangeInput}
                                                        />
                                                        <p className='text-[#7A828A] font-bold ml-4 cursor-default'>%</p>
                                                    </div>
                                                    {errors.discount && <p className='text-red-700 mt-2'>{errors.discount.message}</p>}
                                                </div>
                                            </>
                                        )}
                                    />
                                </div>

                                <Controller control={control} name='quantity' rules={{
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
                                                    ${!!errors.quantity ? 'border-[1px] border-red-900' : 'border-[1px] border-[#FFAAAF]'} `}
                                                placeholder="000.000"
                                                // onChange={(e) => {
                                                //     const reg = /[^1-9]/g
                                                //     const value = e.target.value
                                                //     field.onChange(value.replace(reg, ''))
                                                // }}
                                                value={editProduct?.quantity}
                                                {...register('quantity')}
                                                onChange={onChangeInput}

                                            />
                                            {errors.quantity && <p className='text-red-700 mt-2'>{errors.quantity.message}</p>}
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
                                <div className='flex text-center  w-16 justify-start gap-5'>
                                    <h3 className='text-[#4C4C4C] font-semibold'>Ẩn</h3>
                                    {/* Swich */}
                                    <div className="form-control">
                                        <input type="checkbox" className="toggle toggle-error" />
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
                                    duration-150 justify-evenly bg-[#EA4B48] hover:bg-[#ff6d65] cursor-pointer
                                    `}>
                                <button className={`text-center text-base font-bold text-[#FFFFFF] 
                                        `}>
                                    Sửa sản phẩm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
