import BuyzzyFooterLogo from "../../Assets/TSX/BuyzzyFooterLogo";
import Container from "../container/Container";

export default function Footer() {
  return (
    <footer className="footer-bg mt-10 pb-10">
      <div className="container mx-auto">
        <div className="bg-[#FFEAE9] h-[5px] w-full"></div>
        <div className="bg-[#333] h-[3px] w-full"></div>
        <div className="flex justify-center mt-[35px]">
          <div>
            <BuyzzyFooterLogo />
            <div className="border-b-[3px] border-black my-3" />
          </div>
        </div>
        <Container>
          <div className="relative mt-6">
            <div className="grid grid-cols-3 gap-3 text-center justify-center">
              <div className="col-span-1">
                <span className="font-semibold ">THANH TOÁN</span>
                <div className="flex justify-center">
                  <svg
                    fill="#000000"
                    width={100}
                    height={70}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 0 1 1.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 0 0-.149-.199 6.948 6.948 0 0 0-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" />
                  </svg>
                  <img src="/IconCash/cash.png" width={70} alt="" />
                </div>
              </div>
              <div className="col-span-1 ">
                <span className="font-semibold ">ĐƠN VỊ VẬN CHUYỂN</span>

                <div className="justify-center flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 70 70"
                    fill="none"
                  >
                    <path
                      d="M61.25 46.6667V23.3334C61.249 22.3104 60.9789 21.3057 60.467 20.4201C59.9551 19.5345 59.2192 18.799 58.3333 18.2875L37.9167 6.62087C37.0299 6.10889 36.024 5.83936 35 5.83936C33.976 5.83936 32.9701 6.10889 32.0833 6.62087L11.6667 18.2875C10.7808 18.799 10.0449 19.5345 9.53301 20.4201C9.02108 21.3057 8.75105 22.3104 8.75 23.3334V46.6667C8.75105 47.6897 9.02108 48.6943 9.53301 49.58C10.0449 50.4656 10.7808 51.2011 11.6667 51.7125L32.0833 63.3792C32.9701 63.8912 33.976 64.1607 35 64.1607C36.024 64.1607 37.0299 63.8912 37.9167 63.3792L58.3333 51.7125C59.2192 51.2011 59.9551 50.4656 60.467 49.58C60.9789 48.6943 61.249 47.6897 61.25 46.6667Z"
                      stroke="#1A1A1A"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21.875 12.2791L35 19.8624L48.125 12.2791"
                      stroke="#1A1A1A"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21.875 57.7208V42.5833L8.75 35"
                      stroke="#1A1A1A"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M61.25 35L48.125 42.5833V57.7208"
                      stroke="#1A1A1A"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.53748 20.3L35 35.0292L60.4625 20.3"
                      stroke="#1A1A1A"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M35 64.4V35"
                      stroke="#1A1A1A"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="col-span-1 ">
                <span className="font-semibold ">VỀ BUYZZLE</span>
                <div className="justify-center flex flex-col">
                  <p className="hover:text-[#FFAAAF] max-w-max">
                    <a href="/clause">Điều Khoảng Buyzzle</a>
                  </p>

                  <p className="hover:text-[#FFAAAF] max-w-max">
                    <a href="/voucher">Hot voucher</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
