import React from 'react'
import Container from '../../../../components/container/Container'
import { Images } from '../../../../Assets/TS'
import Period from '../../../../Assets/TSX/Period'
import HeartDontAction from '../../../../Assets/TSX/HeartDontAction'
import CircleAvrCMT from '../../../../Assets/TSX/CircleAvrCMT'
import LineCMT from '../../../../Assets/TSX/LineCMT'
import HeartAction from '../../../../Assets/TSX/HeartAction'
import { type } from 'os'
import RateDetailCMT from '../../../../components/Sitebar/Rate/RateDetailCMT'
export interface RatingStarDetail {
    checked: boolean
    rating: number
}
const arrRating: RatingStarDetail[] = [
    { checked: false, rating: 5 },
    { checked: false, rating: 4 },
    { checked: false, rating: 3 },
    { checked: false, rating: 2 },
    { checked: false, rating: 1 },
]
export default function Rating() {
    return (
        <Container>
            <div className='mt-5 '>
                <div className='grid gap-4 grid-cols-3'>
                    {/* Left Comment */}
                    <div className='col-span-2 '>
                        <div className='border-t-[1px] border-[#EA4B48] px-11 py-8'>
                            {/* header comment */}
                            <div className=' justify-between flex mb-4'>
                                <div className='flex items-center gap-3'>
                                    {/* hinh anh */}
                                    <div className="relative">
                                        <img className="w-10 h-10 rounded-full" src={Images.Avtcmt} alt='Avtcmt' />
                                        <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
                                    </div>{/* end hinh anh */}
                                    {/* thong tin users */}
                                    <div>
                                        {/* name - period - date */}
                                        <div className='flex items-center'>
                                            {/* name */} <p className='text-[#1A1A1A] text-xl font-medium'>Nguynena123</p>{/* end name */}
                                            {/* period */}<Period /> {/* end period */}
                                            {/* date */} <p className='text-[#4C4C4C] font-normal text-sm'>12-10-2023</p>{/* end date */}
                                        </div>{/* end name - period - date */}
                                        {/* rating */}
                                        <div className="rating rating-xs">
                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                        </div>{/* end rating */}
                                        {/* quatity */}<p className='text-[#4C4C4C] font-normal text-sm'>Số lượng: 10</p>{/* end quatity */}
                                    </div> {/* end thong tin users */}
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <p>100</p>
                                    <HeartDontAction />
                                </div>
                            </div>{/* end header comment */}
                            {/* content comment */}
                            <div className='border-t-[1px] border-[#E0E0E0] py-2'>
                                <p className='text-[#4C4C4C]'>Đã mua em nó shop này 1 lần dùng gần 1 năm rồi ok lắm hôm nay mua lại vì hôm đi chơi bị mất.
                                    vẫn chất lg như lần trc esd15 mãi đỉnh , mà chắc do shop uy tín lên dùng rất tốt âm thanh bass
                                    trest chống âm  cách tiếng onf đeo êm tai ko bị đua tai luôn chyaj bộ thể dục thoải mái nhá ae
                                    lên mua thanh anh shop tư vấn hài lòng vãi</p>
                            </div>{/* end content comment */}
                            {/* reply content comment */}
                            <div className='mx-3 my-2  flex'>
                                <div className='ml-2'>
                                    <LineCMT />
                                </div>
                                {/* shop reply cmt */}
                                <div className='flex items-center mt-1 ml-3 gap-3'>
                                    {/* hinh anh */}
                                    <div className="relative">
                                        <CircleAvrCMT />
                                        <span className="top-0 left-5 absolute  w-2.5 h-2.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
                                    </div>{/* end hinh anh */}
                                    {/* thong tin users */}
                                    <div>
                                        {/* name - period - date */}
                                        <div className='flex items-center'>
                                            {/* name */} <p className='text-[#1A1A1A] text-base font-medium'>ShopTaiNghe</p>{/* end name */}
                                            {/* period */}<Period /> {/* end period */}
                                            {/* date */} <p className='text-[#4C4C4C] text-[12px]'>12-10-2023</p>{/* end date */}
                                        </div>{/* end name - period - date */}
                                        {/* quatity */}<p className='text-[#4C4C4C] text-[12px]'>Số lượng: 10</p>{/* end quatity */}
                                    </div> {/* end thong tin users */}
                                </div>{/* shop reply cmt */}
                            </div>{/* end reply content comment */}
                            {/* content comment */}
                            <div className='border-t-[1px] border-[#E0E0E0] py-2 mx-7'>
                                <p className='text-[#4C4C4C]'>Đã mua em nó shop này 1 lần dùng gần 1 năm rồi ok lắm hôm nay mua lại vì hôm đi chơi bị mất.
                                    vẫn chất lg như lần trc esd15 mãi đỉnh , mà chắc do shop uy tín lên dùng rất tốt âm thanh bass
                                    trest chống âm  cách tiếng onf đeo êm tai ko bị đua tai luôn chyaj bộ thể dục thoải mái nhá ae
                                    lên mua thanh anh shop tư vấn hài lòng vãi</p>
                            </div>{/* end content comment */}
                        </div>
                        {/* ///////////////////////////////////////////////////// */}
                        <div className='col-span-2 border-t-[1px] border-[#EA4B48] px-11 py-8'>
                            {/* header comment */}
                            <div className=' justify-between flex mb-4'>
                                <div className='flex items-center gap-3'>
                                    {/* hinh anh */}
                                    <div className="relative">
                                        <img className="w-10 h-10 rounded-full" src={Images.Avtcmt} alt='Avtcmt' />
                                        <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
                                    </div>{/* end hinh anh */}
                                    {/* thong tin users */}
                                    <div>
                                        {/* name - period - date */}
                                        <div className='flex items-center'>
                                            {/* name */} <p className='text-[#1A1A1A] text-xl font-medium'>Nguynena123</p>{/* end name */}
                                            {/* period */}<Period /> {/* end period */}
                                            {/* date */} <p className='text-[#4C4C4C] font-normal text-sm'>12-10-2023</p>{/* end date */}
                                        </div>{/* end name - period - date */}
                                        {/* rating */}
                                        <div className="rating rating-xs">
                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                        </div>{/* end rating */}
                                        {/* quatity */}<p className='text-[#4C4C4C] font-normal text-sm'>Số lượng: 10</p>{/* end quatity */}
                                    </div> {/* end thong tin users */}
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <p>100</p>
                                    <HeartAction />
                                </div>
                            </div>{/* end header comment */}
                            {/* content comment */}
                            <div className='border-t-[1px] border-[#E0E0E0] py-2'>
                                <p className='text-[#4C4C4C]'>Đã mua em nó shop này 1 lần dùng gần 1 năm rồi ok lắm hôm nay mua lại vì hôm đi chơi bị mất.
                                    vẫn chất lg như lần trc esd15 mãi đỉnh , mà chắc do shop uy tín lên dùng rất tốt âm thanh bass
                                    trest chống âm  cách tiếng onf đeo êm tai ko bị đua tai luôn chyaj bộ thể dục thoải mái nhá ae
                                    lên mua thanh anh shop tư vấn hài lòng vãi</p>
                            </div>{/* end content comment */}
                            {/* reply content comment */}
                            <div className='mx-3 my-2  flex'>
                                <div className='ml-2'>
                                    <LineCMT />
                                </div>
                                {/* shop reply cmt */}
                                <div className='flex items-center mt-1 ml-3 gap-3'>
                                    {/* hinh anh */}
                                    <div className="relative">
                                        <CircleAvrCMT />
                                        <span className="top-0 left-5 absolute  w-2.5 h-2.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
                                    </div>{/* end hinh anh */}
                                    {/* thong tin users */}
                                    <div>
                                        {/* name - period - date */}
                                        <div className='flex items-center'>
                                            {/* name */} <p className='text-[#1A1A1A] text-base font-medium'>ShopTaiNghe</p>{/* end name */}
                                            {/* period */}<Period /> {/* end period */}
                                            {/* date */} <p className='text-[#4C4C4C] text-[12px]'>12-10-2023</p>{/* end date */}
                                        </div>{/* end name - period - date */}
                                        {/* quatity */}<p className='text-[#4C4C4C] text-[12px]'>Số lượng: 10</p>{/* end quatity */}
                                    </div> {/* end thong tin users */}
                                </div>{/* shop reply cmt */}
                            </div>{/* end reply content comment */}
                            {/* content comment */}
                            <div className='border-t-[1px] border-[#E0E0E0] py-2 mx-7'>
                                <p className='text-[#4C4C4C]'>Đã mua em nó shop này 1 lần dùng gần 1 năm rồi ok lắm hôm nay mua lại vì hôm đi chơi bị mất.
                                    vẫn chất lg như lần trc esd15 mãi đỉnh</p>
                            </div>{/* end content comment */}
                        </div>
                    </div>{/* end Left Comment */}
                    {/* Right rating */}
                    <div>
                        <div className='col-span-1 w-[312px] h-auto p-4 float-right
                        shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                            <div className='py-5'>
                                <p className='text-[#1A1A1A] text-xl text-center font-medium'>Tìm Kiếm</p>
                                <div className="rate flex justify-center mt-3">
                                    <div className="mt-3">
                                        {arrRating.map((item, index) => {
                                            return (
                                                <RateDetailCMT checked={item.checked} rating={item.rating} key={index} />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{/* end Right rating */}
                </div>
            </div>
        </Container>
    )
}
