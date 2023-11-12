/* eslint-disable no-var */

import { Link } from "react-router-dom";
import Container from "../container/Container";
import LogoWeb from "../../Assets/TSX/LogoWeb";
import HeaderTopAdmin from "../HeaderTop/HeaderTopAdmin";

export default function HeaderAdmin() {
  return (
    <>
      <header className="Header">
        <Container>
          <div className="my-1">
            <HeaderTopAdmin />
          </div>
        </Container>
        <div className="border-2 border-[#E6E6E6]" />
        <Container>
          <div className="Header-center bg-white h-[91px]">
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <div className="p-[10px]  max-[426px]:p-[1px]">
                  <Link to="/">
                    <LogoWeb />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="Header-bottom bg-[#FFEAE9] h-[60px]"></div>
      </header>
    </>
  );
}
