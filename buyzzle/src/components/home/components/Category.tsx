
import { Link } from 'react-router-dom'

type Category = {
  id: number
  img: string,
  title: string
}

export default function Category(props: Category) {
  return (
    <>
      <Link to={`/FiltersPage/${props.id}`}>
        <div className='max-w-[200px] max-lg:max-w-[90%] border-2 border-solid 
        hover:bg-[#f4f4f4] border-[#E0E0E0] py-[16px] px-[17.5px] rounded-lg text-center
          max-lg:py-1 max-lg:px-3 max-lg:justify-center'>
          <img className='w-[151px] h-[123px] object-contain' src={props.img} alt="" />
          <span className='max-lg:text-[10px]'>{props.title}</span>
        </div>
      </Link>
    </>
  )
}