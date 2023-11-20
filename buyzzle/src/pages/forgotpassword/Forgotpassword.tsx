import { Images } from "../../assets/TS/index";

// import "./forgotpassword.css";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import LogoApple from "../../assets/PNG/lgApple.png";
import LogoFace from "../../assets/PNG/lgFace.png";
import LogoGoogle from "../../assets/PNG/lgG.png";
function Forgotpassword() {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("checker", data);
      const response = await axios.post(
        "http://localhost:5000/buyzzle/auth/forgotpassword",
        data
      );
      if (response.status === 200) {
        console.log("Send email successfully");
        toast.success("Send email successfully", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        console.log("Send email Failed!");
        toast.warning("Send email failed", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <body className="login-bg flex">
      <div className="h-1083px w-963px p-4 relative">
        <img
          src={Images.bgRegisterIcon}
          alt="bgRegisterIcon"
          width={"924px"}
          height={"1083px"}
        />
        <div className="absolute inset-0 flex justify-center items-center ">
          <Link to="/">
            <img
              src={Images.logoSlogan}
              alt="logo"
              width={"90%"}
              height={"90%"}
            />
          </Link>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center min-h-screen bg-white">
        <div className="w-[424px]">
          <form onSubmit={onSubmit} className="registration-form">
            <h1 className=" login-a ">QUÊN MẬT KHẨU</h1>
            <div className="mb-4">
              <label htmlFor="email" className="login-a4 font-sans">
                Email
              </label>
              <input
                type="text"
                id="email"
                // value={formData.email}
                className="w-full h-[46px] p-2 font-sans login-a4 focus:outline-none focus:ring focus:ring-[#FFAAAF] login-input login-a4"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-[424px] h-[49.44px] bg-[#00B207] text-white py-2 rounded-md transition duration-300 mt-[25px]"
            >
              GỬI
            </button>
            <div className="flex items-center my-4">
              <div className="grow h-px bg-slate-300"></div>
              <div className="mx-2 text-white-500">Hoặc</div>
              <div className="grow h-px bg-slate-300"></div>
            </div>
            <div className="flex justify-center space-x-3">
              <button className="flex items-center justify-center w-12 h-12 text-white rounded-full border-2">
                <img src={LogoGoogle} alt="Google" className="w-6 h-6" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 text-white rounded-full border-2">
                <img src={LogoApple} alt="Apple" className="w-6 h-6" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 text-white rounded-full border-2">
                <img src={LogoFace} alt="Facebook" className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-6 text-center">
              <span className="text-gray-600">
                Bạn đã có tài khoản Buyzzle?{" "}
              </span>
              <a href="#" className="text-black-500 hover:underline font-bold">
                Đăng nhập
              </a>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
}

export default Forgotpassword;
