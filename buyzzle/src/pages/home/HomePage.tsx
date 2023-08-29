
import { Images } from '../../Assets/TS';
import Container from '../../components/container/Container';
import Category from './components/Category';

function HomePage() {
  return (
    <>

      <Container>

        <div className='container mt-[50px]'>

          <div className='flex justify-between max-xl:flex-wrap'>

            <div className="max-w-[872px] max-xl:mx-auto max-xl:mb-[20px]">
              <img src={Images.bannerHome} alt="" />
            </div>

            <div className="flex-col max-w-[421px] max-xl:mx-auto">
              <img className='mb-[18px] w-full' src={Images.banerPreeShip} alt="" />

              <div className="flex justify-between max-w-[421px]">
                <img className='object-cover' src={Images.banner3} alt="" />
                <img className='object-cover' src={Images.banner4} alt="" />
              </div>

            </div>
          </div>
        </div>

        <div className='container mt-[60px] '>

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

      </Container>
    </>

  )
}

export default HomePage;
