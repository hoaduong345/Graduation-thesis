
import { Link } from 'react-router-dom'

type Category = {
  img: string,
  title: string
}

export default function Category(props: Category) {
  return (
    <>
      <div className='max-w-[200px] max-lg:max-w-[90%] border-2 border-solid hover:bg-[#f4f4f4] border-[#E0E0E0] py-[16px] px-[17.5px] rounded-lg text-center' >
        <Link to="">
          <img className='w-[151px] h-[123px]' src={props.img} alt="" />
          <span>{props.title}</span>
        </Link>

      </div>
    </>
  )
}