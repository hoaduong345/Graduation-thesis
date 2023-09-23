import { useState, useEffect } from "react"
import Container from '../../../../components/container/Container'
import SitebarAdmin from '../Sitebar/Sitebar'
import PlusSquare from '../Assets/TSX/PlusSquare'
import Search from '../../../../Assets/TSX/Search'
import StatisticalAdmin from '../Assets/TSX/statistical'
import Filter from '../Assets/TSX/Filter'
import Download from '../Assets/TSX/Download'
import { Images } from '../../../../Assets/TS'
import Edit from '../Assets/TSX/Edit'
import { Products } from '../../User/FilterPage/FiltersPage'
import axios from 'axios'
import ListproductMap from "./ListproductMap"
import { appConfig } from "../../../../configsEnv"
import { toast } from 'react-toastify'
import { productController } from "../../../../Controllers/ProductsController"
import { async } from "@firebase/util"
import { imagesController } from "../../../../Controllers/ImagesController"

export default function ListproductsAdmin() {

  const [products, setProducts] = useState<Products[]>([])
  console.log("🚀 ~ file: Listproducts.tsx:16 ~ ListproductsAdmin ~ products:", products)
  const [remove, setRemove] = useState('')

  useEffect(() => {
    getData()
  }, [])


  const getData = () => {
    productController.getList().then((res) => {
      setProducts(res)
    })
  }


  const handleRemove = async (id: number) => {
    await productController.remove(id).then((_) => {
      toast.success("Xóa thành công !")
      getData()
    }).catch((error) => {
      console.log("🚀 ~ file: ListproductMap.tsx:24 ~ useEffect ~ error:", error)
      toast.error("Xóa thất bại !")
    })

    // await imagesController.remove(id).then((_) => {
    //   toast.success("Xóa thành công !")
    //   getData()
    // }).catch((error) => {
    //   console.log("🚀 ~ file: ListproductMap.tsx:24 ~ useEffect ~ error:", error)
    //   toast.error("Xóa thất bại !")
    // })
  }

  return (
    <>
      <Container>
        <div className='grid grid-cols-5'>
          <div className="col-span-1 max-2xl:hidden">
            <SitebarAdmin />
          </div>
          <div className='content-right-filter mt-[34px] col-span-4 max-2xl:col-span-1 '>
            {/* h2 */}
            <div>
              <h2 className="txt-filter font-bold text-[#1A1A1A] text-3xl" >
                DANH SÁCH SẢN PHẨM
              </h2>
            </div>
            {/* end h2 */}
            <div className='grid gap-4 grid-cols-9 mt-12'>
              <div className='col-span-2 ml-20'>
                <div className='flex items-center w-[196px] rounded-md h-[46px] bg-[#EA4B48] justify-evenly cursor-pointer'>
                  <PlusSquare />
                  <button className='text-center text-base font-bold text-white '>
                    Thêm sản phẩm
                  </button>
                </div>
              </div>
              <div className='flex col-span-7 justify-around ml-20'>
                {/* input */}
                <div className="items-center ">
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
                </div>

                <div>
                  <div className='flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer'>
                    <StatisticalAdmin />
                    <button className='text-center text-base font-bold text-[#EA4B48] '>
                      Thống kê
                    </button>
                  </div>
                </div>

                <div>
                  <div className='flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer'>
                    <Download />
                    <button className='text-center text-base font-bold text-[#EA4B48] '>
                      Xuất excel
                    </button>
                  </div>
                </div>

                <div>
                  <div className='flex items-center w-[112px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer'>
                    <Filter />
                    <button className='text-center text-base font-bold text-[#EA4B48] '>
                      Bộ lọc
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-[100%] mt-6 items-center flex'>
              <div className='w-[10%] text-center'>
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-4 h-4 accent-[#EA4B48] "
                />
              </div>
              <div className='w-[35%] text-center'>
                <h3 className='text-[#1A1A1A] text-sm font-semibold leading-4'>THÔNG TIN</h3>
              </div>
              <div className='w-[45%] flex justify-between'>
                <h3 className='text-[#1A1A1A] text-sm font-semibold leading-4'>SỐ LƯỢNG</h3>
                <h3 className='text-[#1A1A1A] text-sm font-semibold leading-4'>TÌNH TRẠNG</h3>
                <h3 className='text-[#1A1A1A] text-sm font-semibold leading-4'>SỐ LƯỢNG ĐÃ BÁN</h3>
                <h3 className='text-[#1A1A1A] text-sm font-semibold leading-4'>ĐÁNH GIÁ</h3>
              </div>
            </div>
            <div>
              {
                products.length > 0 ?
                  products?.map((items) => {
                    return (
                      <>
                        <ListproductMap HandleXoa={handleRemove} products={items} />
                      </>
                    );
                  }) : <p>khong co san pham</p>
              }
            </div>

          </div>
        </div>
      </Container>
    </>
  )
}
