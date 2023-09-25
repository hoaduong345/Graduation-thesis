import { ChangeEvent, useState } from 'react'
import Container from '../../../../components/container/Container'
import Sitebar from './Sitebar/Sitebar'
import { ChangeHandler, Controller, useForm } from 'react-hook-form';
import HidePass from '../../../../Assets/TSX/HidePass';
import ShowPass from '../../../../Assets/TSX/ShowPass';

type FormValues = {
    userName: string,
    yourName: string,
    email: string,
    sex: boolean,
    phoneNumber: number,
    DateofBirth: string,
    fullName: string,
    Address: string
}
export default function UserProfile() {
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<FormValues>({
        defaultValues:
        {
            userName: '',
            yourName: '',
            email: '',
            sex: true,
            DateofBirth: '',
            phoneNumber: undefined,
            fullName: '',
            Address: ''
        },

    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setSelectedFile(file);

            // Create a URL for the selected image and set it in the state
            const imageUrl = URL.createObjectURL(file);
            setImageURL(imageUrl);

            // You can perform further actions with the selected file here
            console.log(`Selected file: ${file.name}`);
        } else {
            setSelectedFile(null); // Reset the selectedFile state when no file is selected
            setImageURL(null); // Reset the imageURL state
            console.log('No file selected');
        }
    };
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorss, setErrors] = useState({
        username: '',
        password: '',
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const { name, value } = e.target;
        // setFormData({
        //     ...formData,
        //     [name]: value,
        // });

        // if (isFormSubmitted) {
        //     setErrors({
        //         ...errorss,
        //         [name]: '',
        //     });
        // }
    };
    const submitData = (data: any) => {
        console.log(data);
    }
    return (
        <Container>
            <body className="body-filter container mx-auto">
                <div>
                    <div className='grid grid-cols-4 gap-4'>
                        <div>
                            <div className='col-span-1 max-2xl:hidden'>
                                <Sitebar />
                            </div>
                        </div>
                        <div className='mt-9 col-span-3 max-2xl:col-span-1 grid grid-cols-5 gap-4'>
                            <form onSubmit={handleSubmit(submitData)} className='card py-4 px-5 col-span-3  rounded-[6px]
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                <span className='text-[#000] text-2xl font-normal '>Hồ sơ của tôi</span>
                                <p className='text-[#393939] text-sm font-normal'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                                <div className='flex w-[100%] mt-4 justify-between'>
                                    <div className='w-[48%]'>
                                        <Controller control={control} name='userName' rules={{
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
                                                <label htmlFor='name' className='text-[#4C4C4C] text-sm font-medium'>Tên đăng nhập</label>
                                                {/* input addNameProducts */}
                                                <input
                                                    className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                            ${!!errors.userName ? 'border-[2px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}`}
                                                    placeholder="Tên đăng nhập"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                                {!!errors.userName && <p className='text-red-700 mt-2'>{errors.userName.message}</p>}</>
                                        )} />
                                        {/* end input addNameProducts */}
                                    </div>
                                    <div className='w-[48%]'>
                                        <Controller control={control} name='yourName' rules={{
                                            required: {
                                                value: true,
                                                message: 'Bạn phải nhập thông tin cho trường dữ liệu này!'
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Tên người dùng phải lớn hơn 6 ký tự'
                                            }
                                        }} render={({ field }) => (
                                            <>
                                                <label htmlFor='name' className='text-[#4C4C4C] text-sm font-medium'>Tên người dùng</label>
                                                {/* input addNameProducts */}
                                                <input
                                                    className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                            ${!!errors.yourName ? 'border-[2px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}`}
                                                    placeholder="Tên người dùng"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                                {!!errors.yourName && <p className='text-red-700 mt-2'>{errors.yourName.message}</p>}</>
                                        )} />
                                        {/* end input addNameProducts */}
                                    </div>
                                </div>
                                <div className='w-[100%] mt-4'>
                                    <Controller control={control} name='email' rules={{
                                        required: {
                                            value: true,
                                            message: 'Bạn phải nhập thông tin cho trường dữ liệu này!'
                                        }
                                    }} render={({ field }) => (
                                        <>
                                            <label htmlFor='name' className='text-[#4C4C4C] text-sm font-medium'>Email</label>
                                            {/* input addNameProducts */}
                                            <input
                                                className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                            ${!!errors.email ? 'border-[2px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}`}
                                                placeholder="Email"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                            {!!errors.email && <p className='text-red-700 mt-2'>{errors.email.message}</p>}</>
                                    )} />
                                    {/* end input addNameProducts */}
                                </div>
                                <div className='w-[100%] mt-4 flex justify-between'>
                                    <div className='w-[48%]'>
                                        <label htmlFor='name' className='text-[#4C4C4C] text-sm font-medium'>Giới tính</label>
                                        <div className='flex w-[100%] mt-6'>
                                            <div className='flex items-center w-[33%] gap-1'>
                                                <div>
                                                    <h3>Nam</h3>
                                                </div>
                                                <div className="flex items-center justify-start ">
                                                    <input
                                                        type="radio"
                                                        name="colored-radio"
                                                        id="orange-radio"
                                                        className="appearance-none h-6 w-6 border border-[#CCCCCC] rounded-full 
                                            checked:bg-[#EA4B48] checked:scale-75 transition-all duration-200 peer "
                                                    />
                                                    <div
                                                        className="h-6 w-6 absolute rounded-full pointer-events-none
                                            peer-checked:border-[#EA4B48] peer-checked:border-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex items-center w-[33%] gap-1'>
                                                <div>
                                                    <h3>Nữ</h3>
                                                </div>
                                                <div className="flex items-center justify-start ">
                                                    <input
                                                        type="radio"
                                                        name="colored-radio"
                                                        id="orange-radio"
                                                        className="appearance-none h-6 w-6 border border-[#CCCCCC] rounded-full 
                                            checked:bg-[#EA4B48] checked:scale-75 transition-all duration-200 peer "
                                                    />
                                                    <div
                                                        className="h-6 w-6 absolute rounded-full pointer-events-none
                                            peer-checked:border-[#EA4B48] peer-checked:border-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex items-center w-[33%] gap-1'>
                                                <div>
                                                    <h3>Khác</h3>
                                                </div>
                                                <div className="flex items-center justify-start ">
                                                    <input
                                                        type="radio"
                                                        name="colored-radio"
                                                        id="orange-radio"
                                                        className="appearance-none h-6 w-6 border border-[#CCCCCC] rounded-full 
                                            checked:bg-[#EA4B48] checked:scale-75 transition-all duration-200 peer "
                                                    />
                                                    <div
                                                        className="h-6 w-6 absolute rounded-full pointer-events-none
                                            peer-checked:border-[#EA4B48] peer-checked:border-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[48%]'>
                                        <Controller control={control} name='phoneNumber' rules={{
                                            required: {
                                                value: true,
                                                message: 'Bạn phải nhập thông tin cho trường dữ liệu này!'
                                            }
                                        }} render={({ field }) => (
                                            <>
                                                <label htmlFor='name' className='text-[#4C4C4C] text-sm font-medium'>Số điện thoại</label>
                                                {/* input addNameProducts */}
                                                <input
                                                    className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                            ${!!errors.phoneNumber ? 'border-[2px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}`}
                                                    placeholder="Số điện thoại"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                                {!!errors.phoneNumber && <p className='text-red-700 mt-2'>{errors.phoneNumber.message}</p>}</>
                                        )} />
                                    </div>
                                </div>
                                <div className='w-[100%] flex h-auto items-center'>
                                    <div className='w-[15%] mt-[33px]'>
                                        <label htmlFor='name' className='text-[#4C4C4C] text-sm font-medium'>Ngày sinh</label>
                                    </div>
                                    <div className=' w-[100%] flex justify-start gap-3'>
                                        <div className="w-[32%] ">
                                            <div className="mt-3">
                                                <p>Ngày*</p>
                                                <select className="h-11 mt-1 px-4 border-[1px] border-[#FFAAAF] text-sm text-[#393939] w-full rounded-[6px] cursor-pointer outline-none ">
                                                    <option className=" hidden">Chọn ngày</option>
                                                    {
                                                        Array.from({ length: 31 }).map((e, i) => {
                                                            return (
                                                                <>
                                                                    <option>{i + 1}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-[32%]  ">
                                            <div className="mt-3">
                                                <p>Tháng*</p>
                                                <select className="h-11 px-4 mt-1 border-[1px] border-[#FFAAAF] text-sm text-[#393939] w-full rounded-[6px] cursor-pointer outline-none ">
                                                    <option className=" hidden">Chọn Tháng</option>
                                                    {
                                                        Array.from({ length: 12 }).map((e, i) => {
                                                            return (
                                                                <>
                                                                    <option>{i + 1}</option>
                                                                </>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-[32%] ">
                                            <div className="mt-3">
                                                <p>Năm*</p>
                                                <select className="h-11 px-4 border-[1px] border-[#FFAAAF] mt-1 text-[#393939] text-sm w-full rounded-[6px] cursor-pointer outline-none ">
                                                    <option className=" hidden">Chọn năm</option>
                                                    {
                                                        Array.from({ length: 100 }).map((e, i) => {
                                                            return (
                                                                <>
                                                                    <option>{1950 + i}</option>
                                                                </>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* button */}
                                <div className='flex w-[122.164px] rounded-md h-[32px] transition duration-150 justify-evenly 
                                bg-[#EA4B48] hover:bg-[#ff6d65] mt-5'>
                                    <button className='text-center text-base font-bold text-[#FFFFFF]'>
                                        Lưu
                                    </button>
                                </div>
                            </form>
                            <div className='card py-4 px-5 col-span-2 rounded-[6px]
                        shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]' >
                                <div className=' flex flex-col items-center my-auto'>
                                    <div className="avatar online">
                                        <div className="max-w-[174px] rounded-full border-[4px] border-[#2E89FF]">
                                            <div className='w-[100%] h-[100%]'>
                                                {selectedFile ? (
                                                    <>
                                                        {/* <p>Selected file: {selectedFile.name}</p> */}
                                                        <img src={imageURL!} alt="Selected" width={"100%"} className='object-cover' height={"100%"} />
                                                    </>
                                                ) : (
                                                    <div className='w-[174px]'>
                                                        <p className=' flex flex-col items-center my-16'>No file selected</p>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                    {/* button */}
                                    <label htmlFor="images">

                                        <div className='flex items-center w-[141px] rounded-md h-[32px]
                                 hover:bg-[#FFEAE9] transition duration-150 border-[#EA4B48]
                                  border-[1px] justify-evenly cursor-pointer mt-5' onClick={() => {
                                                if (!!selectedFile) {
                                                    console.log('Confirm')
                                                }
                                            }}>
                                            {!selectedFile && <input type="file" onChange={handleFileChange}
                                                id='images' multiple className='hidden' />}
                                            <button className='text-center text-sm font-bold text-[#1A1A1A] ' >
                                                {
                                                    selectedFile ? 'Xác nhận' : 'Thay đổi ảnh'
                                                }
                                            </button>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className='card py-4 px-5 rounded-[6px] col-span-5
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                <span className='text-[#000] text-2xl font-normal '>Địa chỉ thanh toán</span>
                                <p className='text-[#393939] text-sm font-normal'>Thêm địa chỉ để dễ dàng giao hàng</p>
                                <div className='border-[1px] border-[#E0E0E0] w-full my-4 '></div>
                                <div className='flex gap-7'>
                                    <div className='leftAdress w-[50%]'>
                                        <div className='flex w-[100%] gap-6 justify-between'>
                                            <div className='w-[55%]'>
                                                <Controller control={control} name='fullName' rules={{
                                                    required: {
                                                        value: true,
                                                        message: 'Bạn phải nhập thông tin cho trường dữ liệu này!'
                                                    }
                                                }} render={({ field }) => (
                                                    <>
                                                        <label htmlFor='name' className='text-[#4C4C4C] text-sm font-medium'>Họ và tên</label>
                                                        {/* input addNameProducts */}
                                                        <input
                                                            className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                            ${!!errors.fullName ? 'border-[2px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}`}
                                                            placeholder="Họ và tên"
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                        {!!errors.fullName && <p className='text-red-700 mt-2'>{errors.fullName.message}</p>}</>
                                                )} />
                                                {/* end input addNameProducts */}
                                            </div>
                                            <div className='w-[43%]'>
                                                <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px]'>Loại đỉa chỉ*</p>
                                                {/* Dropdown */}
                                                <div className=" w-[100%] flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
                                                    <select className="w-[100%] p-2.5 text-gray-500 bg-white py-[14px] outline-none ">
                                                        <option>Địa chỉ văn phòng</option>
                                                        <option>Địa chỉ công ty</option>
                                                        <option>Nhà riêng</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[100%] mt-4'>
                                            <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px]'>Địa chỉ*</p>
                                            {/* Dropdown */}
                                            <div className=" w-[100%] flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
                                                <select className="w-[100%] p-2.5 text-gray-500 bg-white py-[14px] outline-none ">
                                                    <option className='hidden'>Tỉnh/Thành phố, Quận/Huyện, Phường/Xã</option>
                                                    <option>Thiết bị điện da dụng</option>
                                                    <option>Giày dép da</option>
                                                    <option>Máy ảnh</option>
                                                    <option>Thời trang nam</option>
                                                    <option>Thiết bị điện tử</option>
                                                    <option>Nhà cửa đời sống</option>
                                                    <option>Sắc đẹp</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='w-[100%] mt-4'>
                                            <Controller control={control} name='Address' rules={{
                                                required: {
                                                    value: true,
                                                    message: 'Bạn phải nhập thông tin cho trường dữ liệu này!'
                                                }
                                            }} render={({ field }) => (
                                                <>
                                                    <label htmlFor='name' className='text-[#4C4C4C] text-sm font-medium'>Địa chỉ cụ thể</label>
                                                    {/* input addNameProducts */}
                                                    <input
                                                        className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                            ${!!errors.Address ? 'border-[2px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}`}
                                                        placeholder="Địa chỉ cụ thể"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                    {!!errors.Address && <p className='text-red-700 mt-2'>{errors.Address.message}</p>}</>
                                            )} />
                                            {/* end input addNameProducts */}
                                        </div>
                                    </div>
                                    <div className='rightAdressMap w-[46%]'>
                                        <iframe width="100%" height="118%"
                                            title="map"
                                            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed" />
                                    </div>
                                </div>

                                {/* button */}
                                <div className='w-[50%]'>
                                    <div className='flex w-[122.164px] rounded-md h-[32px] transition duration-150 justify-evenly 
                                bg-[#EA4B48] hover:bg-[#ff6d65] mt-5'>
                                        <button className={`text-center text-base font-bold text-[#FFFFFF]`}>
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='card py-4 px-5 rounded-[6px] col-span-5
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                <span className='text-[#000] text-2xl font-normal '>Thay đổi mật khẩu</span>
                                <div className='border-[1px] border-[#E0E0E0] w-full my-4 '></div>
                                <div className='w-[100%]'>
                                    <div className='w-[100%]'>
                                        <label className="font-medium block mb-1 text-gray-700" htmlFor="password">
                                            Mật khẩu hiện tại:
                                        </label>
                                        <div className="relative w-full items-center">
                                            <button
                                                type='button'
                                                className='absolute right-4 top-8 transform -translate-y-1/2 text-gray-500'
                                                onClick={toggleShowPassword}
                                            >
                                                {showPassword ? (
                                                    <ShowPass />
                                                ) : (
                                                    <HidePass />
                                                )}
                                            </button>
                                            <input className="focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             border-[1px] border-[#FFAAAF]" id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                onChange={handleInputChange}
                                                placeholder='Nhập mật khẩu hiện tại'
                                                autoComplete="off" />
                                        </div>
                                    </div>
                                    <div className='flex w-[100%] justify-between  mt-4'>
                                        <div className='w-[48%]'>
                                            <label className="font-medium block mb-1 text-gray-700" htmlFor="password">
                                                Mật khẩu mới:
                                            </label>
                                            <div className="relative w-full items-center">
                                                <button
                                                    type='button'
                                                    className='absolute right-4 top-8 transform -translate-y-1/2 text-gray-500'
                                                    onClick={toggleShowPassword}
                                                >
                                                    {showPassword ? (
                                                        <ShowPass />
                                                    ) : (
                                                        <HidePass />
                                                    )}
                                                </button>
                                                <input className="focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             border-[1px] border-[#FFAAAF]" id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    onChange={handleInputChange}
                                                    placeholder='Nhập mật khẩu mới:'
                                                    autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className='w-[48%]'>
                                            <label className="font-medium block mb-1 text-gray-700" htmlFor="password">
                                                Xác nhận mật khẩu mới:
                                            </label>
                                            <div className="relative w-full items-center">
                                                <button
                                                    type='button'
                                                    className='absolute right-4 top-8 transform -translate-y-1/2 text-gray-500'
                                                    onClick={toggleShowPassword}
                                                >
                                                    {showPassword ? (
                                                        <ShowPass />
                                                    ) : (
                                                        <HidePass />
                                                    )}
                                                </button>
                                                <input className="focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             border-[1px] border-[#FFAAAF]" id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    onChange={handleInputChange}
                                                    placeholder='Xác nhận mật khẩu mới:'
                                                    autoComplete="off" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* button */}
                                    <div className='flex w-[122.164px] rounded-md h-[32px] transition duration-150 justify-evenly 
                                bg-[#EA4B48] hover:bg-[#ff6d65] mt-5'>
                                        <button className={`text-center text-base font-bold text-[#FFFFFF]`}>
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </body>
        </Container>
    )
}
