import { Images } from "../../../../../Assets/TS";
import CircleAvrCMT from "../../../../../Assets/TSX/CircleAvrCMT";
import HeartAction from "../../../../../Assets/TSX/HeartAction";
import LineCMT from "../../../../../Assets/TSX/LineCMT";
import Period from "../../../../../Assets/TSX/Period";

import RateDetailCMT from "../../../../../components/Sitebar/Rate/RateDetailCMT";
import Container from "../../../../../components/container/Container";
import RatingMap from "./RatingMap";
export interface RatingStarDetail {
  checked: boolean;
  rating: number;
}
const arrRating: RatingStarDetail[] = [
  { checked: false, rating: 5 },
  { checked: false, rating: 4 },
  { checked: false, rating: 3 },
  { checked: false, rating: 2 },
  { checked: false, rating: 1 },
];
export default function Rating() {
  return (
    <Container>
      <div className="mt-5 ">
        <div className="grid gap-4 grid-cols-3">
          {/* Left Comment */}
          <div className="col-span-2 ">
            <div>
              <RatingMap />

              {/* end content comment */}
            </div>

            {/* ///////////////////////////////////////////////////// */}
          </div>
          {/* end Left Comment */}
          {/* Right rating */}
          <div>
            <div
              className="col-span-1 w-[312px] h-auto p-4 float-right
                        shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            >
              <div className="py-5">
                <p className="text-[#1A1A1A] text-xl text-center font-medium">
                  Tìm Kiếm
                </p>
                <div className="rate flex justify-center mt-3">
                  <div className="mt-3">
                    {arrRating.map((item, index) => {
                      return (
                        <RateDetailCMT
                          checked={item.checked}
                          rating={item.rating}
                          key={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end Right rating */}
        </div>
      </div>
    </Container>
  );
}
