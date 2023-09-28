import React, { useState, useEffect } from 'react'
import Container from '../../../../components/container/Container'
import Back from '../Assets/TSX/Back'
import ArrowDown from '../../../../Assets/TSX/ArrowDown'
import UploadIMG from '../Assets/TSX/UploadIMG'
import { Images } from '../../../../Assets/TS'
import { Products } from '../../User/FilterPage/FiltersPage'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { appConfig } from '../../../../configsEnv'
import { Controller, useForm } from 'react-hook-form'
import { storage } from '../../../../Firebase/Config'
import { ref, uploadBytes } from 'firebase/storage'
import EditProductMap from './EditProductMap'

export default function Editproducts() {
    const [editProduct, setEditProduct] = useState<Products>()

    return (
        <Container>
            <body className="body-filter container mx-auto">
                {/* back */}
                <div className='back h-[57px] mt-[46px] '>
                    <div className='flex gap-3 items-center'>
                        <div className='border-[1px] border-[#EA4B48] rounded-md py-4 px-4 max-xl:p-3 max-lg:p-2'>
                            <Back />
                        </div>
                        <div >
                            <p className='font-normal text-sm max-xl:text-xs max-lg:text-[10px]'>Quay lại danh sách sản phẩm</p>
                            <h2 className='uppercase text-[32px] font-bold max-xl:text-[28px] max-lg:text-2xl'>Sửa Sản Phẩm</h2>
                        </div>
                    </div>
                </div>{/* end back */}

                <div className='mt-11 '>

                    <EditProductMap />

                </div>
            </body >
        </Container>
    )
}
