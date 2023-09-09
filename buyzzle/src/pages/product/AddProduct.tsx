import { useState } from "react";
import Container from "../../components/container/Container";
import axios from "axios";


export default function AddProduct() {

  const [product, setProduct] = useState({
    name: '',
    price: 0,
    pricesale: 0,
    count: 0,
    // date: '',
    images: '',
    // images1: '',
    // images2: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    console.log(product)
    axios.post('http://localhost:5000/buyzzle/product/addproduct', product)
      .then(response => {
        return response
      })
      .then(data => {
        console.log(data);
        // Cập nhật giao diện hoặc thực hiện các hành động khác sau khi thêm sản phẩm thành công
      })
      .catch(error => {
        console.error('Error:', error);
        // Xử lý lỗi nếu có
      });
  };

  return (
    <>
      <Container>
        <div>
          <h1 className="text-[32px] font-bold py-[50px]">THÊM SẢN PHẨM</h1>
        </div>

        <form className="flex flex-col w-[40%] gap-[10px]" >
          <input onChange={handleChange} className="p-[16px] border-[1px] rounded-md border-[#FFAAAF]" type="text" name="name" placeholder="Tên" />
          <input onChange={handleChange} className="p-[16px] border-[1px] rounded-md border-[#FFAAAF]" type="number" name="price" placeholder="Giá" />
          <input onChange={handleChange} className="p-[16px] border-[1px] rounded-md border-[#FFAAAF]" type="number" name="pricesale" placeholder="Giảm giá (%)" />
          <input onChange={handleChange} className="p-[16px] border-[1px] rounded-md border-[#FFAAAF]" type="number" name="count" placeholder="Số lượng" />
          {/* <input onChange={handleChange} className="p-[16px] border-[1px] rounded-md border-[#FFAAAF]" type="date" name="date" placeholder="Ngày" /> */}
          <input onChange={handleChange} className="p-[16px] border-[1px] rounded-md border-[#FFAAAF]" type="file" name="images" placeholder="Hình" multiple />

          <button onClick={handleSubmit} type="button" className="p-[16px] text-white border-[1px] rounded-md border-[#FFAAAF] bg-[#00B207]">Thêm</button>
        </form>


      </Container>
    </>
  )
}
