import { Link } from "react-router-dom";

export type Cate = {
  id: string;
  image: string;
  name: string;
};

export default function Category(props: Cate) {
  return (
    <>
      <div>
        <Link to={`/FiltersPage/${props.name}`}>
          <div
            className="max-w-[200px] max-lg:max-w-[90%] border-2 border-solid 
        hover:bg-[#f4f4f4] border-[#E0E0E0] py-[16px] px-[17.5px] rounded-lg text-center
          max-lg:py-1 max-lg:px-3 max-lg:justify-center"
          >
            <img
              className="w-[151px] h-[123px] object-contain"
              src={props.image}
              alt=""
            />
            <span className="max-lg:text-[10px]">{props.name}</span>
          </div>
        </Link>
      </div>
    </>
  );
}
