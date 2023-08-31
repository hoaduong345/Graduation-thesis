import { Images } from "../../Assets/TS";
import Container from "../container/Container";
import Category from "./components/Category";
import Arrow from "../../Assets/arrow";
import Products from "./components/Product";
import Slides from "./components/slides/Slides";
import FlashSale from "./components/FlashSale";

export type Product = {
    id: number;
    imgSrc: string;
    title: string;
    price: number;
    discount: number;
    soldCount: number;
}

export type FlashSaleList = {
    id: number,
    img: string,
    giamGia: number,
    title: string,
    vote: number,
    price: number,
    daBan: number,
}

function Index() {

    const products: Product[] = [{
        id: 1, imgSrc: Images.spGoiY1,
        title: "Bộ Máy Tính Case PC Chơi Game 1", price: 1200000, discount: 50, soldCount: 33
    }, {
        id: 2, imgSrc: Images.spGoiY1,
        title: "Bộ Máy Tính Case PC Chơi Game 2", price: 500000, discount: 5, soldCount: 12
    },
    {
        id: 3, imgSrc: Images.spGoiY1,
        title: "Bộ Máy Tính Case PC Chơi Game 3", price: 680000, discount: 10, soldCount: 42
    }
        , {
        id: 4, imgSrc: Images.spGoiY1,
        title: "Bộ Máy Tính Case PC Chơi Game 4", price: 900000, discount: 20, soldCount: 55
    }
        , {
        id: 5, imgSrc: Images.spGoiY1,
        title: "Bộ Máy Tính Case PC Chơi Game 5", price: 1000000, discount: 70, soldCount: 8
    }
        , {
        id: 6, imgSrc: Images.spGoiY1,
        title: "Bộ Máy Tính Case PC Chơi Game 5", price: 1000000, discount: 70, soldCount: 8
    }]

    const flashSaleLists: FlashSaleList[] = [
        {
            id: 1, img: Images.flashSale1, title: 'Bộ Máy Tính Case PC Chơi Game 1',
            daBan: 10, vote: 2.5, giamGia: 20, price: 500000
        },
        {
            id: 2, img: Images.flashSale1, title: 'Bộ Máy Tính Case PC Chơi Game 2',
            daBan: 40, vote: 3.1, giamGia: 40, price: 300000
        },
        {
            id: 3, img: Images.flashSale1, title: 'Bộ Máy Tính Case PC Chơi Game 3',
            daBan: 40, vote: 3.1, giamGia: 20, price: 700000
        },
        {
            id: 4, img: Images.flashSale1, title: 'Bộ Máy Tính Case PC Chơi Game 4',
            daBan: 40, vote: 3.1, giamGia: 10, price: 100000
        },
        {
            id: 5, img: Images.flashSale1, title: 'Bộ Máy Tính Case PC Chơi Game 5',
            daBan: 40, vote: 3.1, giamGia: 90, price: 3000000
        },
    ]


    return (
        <>

            <Container>

                <div className='container mt-[50px]'>

                    <div className='flex justify-between max-2xl:gap-[1%] max-xl:flex-wrap'>

                        <div className="max-w-[872px] max-lg:mx-auto max-xl:mx-auto max-xl:mb-[20px] banner">
                            <Slides />
                        </div>

                        <div className="flex-col max-w-[421px] max-xl:mx-auto max-xl:hidden">
                            <img className='mb-[18px] w-full' src='https://lzd-img-global.slatic.net/g/icms/images/ims-web/8f54ec75-a209-4a10-acf8-22bf81ed64cb.jpg_2200x2200q90.jpg_.webp' alt="" />

                            <div className="banner_x flex justify-between max-2xl:gap-[1%] max-w-[421px]">
                                <div className="max-w-[196px]">
                                    <img className='object-cover' src={Images.banner3} alt="" />
                                </div>
                                <div className="max-w-[196px]">
                                    <img className='object-cover' src={Images.banner4} alt="" />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className='container mt-[60px] max-lg:hidden'>

                    <div className='flex justify-between p-[40px] max-lg:flex-wrap shadow'>
                        <div className='flex gap-[16px] items-center justify-center max-lg:mb-[20px] max-lg:w-1/2'>
                            <img src={Images.car} alt="" />
                            <span>Giao hàng miễn phí</span>
                        </div>
                        <div className='flex gap-[16px] items-center justify-center max-lg:mb-[20px] max-lg:w-1/2'>
                            <img src={Images.headphones} alt="" />
                            <span>Nhận phản hồi 24/7</span>
                        </div>
                        <div className='flex gap-[16px] items-center justify-center max-lg:w-1/2'>
                            <img src={Images.shopping} alt="" />
                            <span>Mua sắm an toàn 100%</span>
                        </div>
                        <div className='flex gap-[16px] items-center justify-center max-lg:w-1/2'>
                            <img src={Images.Group} alt="" />
                            <span>Hoàn trả hàng</span>
                        </div>
                    </div>

                </div>

                <div className='container my-[60px]'>
                    <h1 className='text-2xl font-bold mb-[15px]'>Danh mục:</h1>

                    <div className='flex flex-wrap gap-[35px] justify-center'>

                        <Category img={Images.Category1} title='Thiết bị điện gia dụng' />
                        <Category img={Images.Category2} title='Giày dép da' />
                        <Category img={Images.Category3} title='Đồng hồ' />
                        <Category img={Images.Category4} title='Máy ảnh' />
                        <Category img={Images.Category5} title='Thời trang nam' />
                        <Category img={Images.Category6} title='Thiết bị điện tử' />

                        <Category img={Images.Category7} title='Phụ kiện trang sức nữ' />
                        <Category img={Images.Category8} title='Túi ví nữ' />
                        <Category img={Images.Category9} title='Giày dép nữ' />
                        <Category img={Images.Category10} title='Sức khỏe' />
                        <Category img={Images.Category11} title='Sắc đẹp' />
                        <Category img={Images.Category12} title='Nhà cửa đời sống' />




                    </div>

                </div>

                <div className='container my-[60px] '>
                    <div className='flex justify-center'>
                        <img src={Images.textMom} alt="" />
                    </div>
                    <div className='flex justify-center gap-[24px]'>
                        <div className='max-w-[420px] scale-95 mt-[100px] duration-300 hover:scale-100'>
                            <img src={Images.imgMom1} alt="" />
                        </div>
                        <div className='max-w-[420px] scale-95 duration-300 hover:scale-100'>
                            <img src={Images.imgMom2} alt="" />
                        </div>
                        <div className='max-w-[420px] scale-95 mt-[100px] duration-300 hover:scale-100'>
                            <img src={Images.imgMom3} alt="" />
                        </div>
                    </div>
                </div>

                <div className='container my-[60px]'>
                    <h1 className='text-2xl font-bold mb-[15px] text-[#ffaaaf]'>FLASH SALE: </h1>

                    <div className='flex flex-wrap gap-[27px]'>

                        {
                            flashSaleLists.map((elements) => {
                                return <FlashSale key={elements.id} flashSaleItem={elements} />
                            })
                        }


                    </div>
                </div>

            </Container>

            <div className='w-full mx-auto my-60px] bg-[#ffeae9] '>
                <Container>
                    <div className='py-[40px] backGroundImg flex justify-between'>
                        <div className='max-w-[276px]'>
                            <img src={Images.chooseUs1} alt="" />
                        </div>
                        <div className='max-w[444px]'>
                            <img src={Images.chooseUs2} alt="" />
                        </div>
                        <div className='flex-col max-w-[536px]'>

                            <div className='max-w-[317px] pb-[26px]'>
                                <span className='text-[40px] font-bold'>100% sản phẩm <span className='text-[#00b207]'>xanh</span> sạch</span>
                            </div>

                            <div className='flex justify-between gap-[12px] items-center max-w-[536px]'>
                                <div className='max-w-[40px]'>
                                    <img src={Images.chooseUs3} alt="" />
                                </div>

                                <div className='text-[18px] font-bold max-w-[500px]'>
                                    <p >Tuần Sản Phẩm Xanh: Mua Sắm Thả Ga - Giảm Giá Lên Đến 50%!</p>
                                </div>
                            </div>

                            <div className='flex justify-between items-center max-w-[536px] pb-[26px]'>
                                <div className='max-w-[40px]'>

                                </div>

                                <div className='text-[14px] max-w-[500px]'>
                                    <p >Giảm giá lên đến 50%: Khám phá bộ sưu tập đa dạng với giá cực kỳ hấp dẫn.
                                        Thêm sức khỏe vào giỏ hàng của bạn mà không làm trống túi tiền!
                                    </p>
                                </div>
                            </div>


                            <div className='flex justify-between items-center max-w-[536px]'>
                                <div className='max-w-[40px]'>
                                    <img src={Images.chooseUs3} alt="" />
                                </div>

                                <div className='text-[18px] font-bold max-w-[500px]'>
                                    <p >Săn Sale Tuần Sản Phẩm Xanh: Mua Rau Sạch, Tiết Kiệm Lớn!"</p>
                                </div>
                            </div>

                            <div className='flex justify-between items-center max-w-[536px] pb-[26px]'>
                                <div className='max-w-[40px]'>

                                </div>

                                <div className='text-[14px] max-w-[500px]'>
                                    <p >Mua sắm thuận tiện: Dễ dàng đặt hàng trực tuyến và
                                        giao hàng tận cửa, để bạn tập trung vào việc nấu nướng ngon lành.
                                    </p>
                                </div>
                            </div>


                            <div className='max-w-[155px] text-[16px] bg-[#ffaaaf] flex text-white py-[13px] px-[25px] items-center justify-between rounded-lg'>
                                <button>
                                    Xem ngay
                                </button>
                                <Arrow />
                            </div>

                        </div>
                    </div>

                </Container>

            </div>

            <Container>
                <div className='my-[60px]'>
                    <h1 className='text-2xl font-bold mb-[15px]'>Thương hiệu nổi tiếng: </h1>

                    <div className='flex justify-between flex-wrap'>

                        <div className='max-w-[310px] border-2 border-solid items-center border-[#E0E0E0] pt-[45px] mb-[10px] px-[81px]'>
                            <img className='object-cover' src={Images.thuongHieu1} alt="" />
                        </div>
                        <div className='max-w-[310px] border-2 border-solid border-[#E0E0E0] pt-[30px] px-[18px] mb-[10px]'>
                            <img className='object-cover' src={Images.thuongHieu2} alt="" />
                        </div>
                        <div className='max-w-[310px] border-2 border-solid border-[#E0E0E0] pt-[33px] px-[18px] mb-[10px]'>
                            <img className='object-cover' src={Images.puma} alt="" />
                        </div>
                        <div className='max-w-[310px] border-2 border-solid border-[#E0E0E0] px-[30px] py-[18px] mb-[10px]'>
                            <img className='object-cover' src={Images.adidas} alt="" />
                        </div>
                    </div>
                </div>

                <div className='container my-[60px]'>
                    <h1 className='text-2xl font-bold mb-[15px]'>Gợi ý sản phẩm: </h1>

                    <div className='flex flex-wrap justify-between max-2xl:gap-[1%]'>

                        {products.map((element) => {
                            return (<Products key={element.id} product={element} />)
                        })}


                    </div>

                </div>
            </Container>

        </>
    )
}

export default Index