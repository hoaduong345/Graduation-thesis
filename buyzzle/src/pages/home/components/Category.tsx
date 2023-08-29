
import {Link} from 'react-router-dom'

type Category = {
    img: string,
    title: string
}

export default function Category(props: Category) {
  return (
    <>
        <div className='max-w-[200px] scale-90 hover:scale-100 border-2 border-solid border-[#E0E0E0] py-[16px] px-[17.5px] rounded-lg text-center' >
            <Link to="">
                <img src={props.img} alt="" />
                <span>{props.title}</span>
            </Link>
            
        </div>
    </>
  )
}