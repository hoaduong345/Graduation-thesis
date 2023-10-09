import axios from "axios"
import { FormValues } from "../pages/home/Admin/Addproduct/Addproducts"
// import { Products } from "../pages/home/User/FilterPage/FiltersPage"

export const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_USER_URL || ''
}

export interface ModelUser{
    id: string,
    email: string,
    username: string,
    // password: string,
    name: string,
    phonenumber: string,
    image: string,
    dateOfBirth: Date,
    sex: boolean,
    UserImage: string[],
};

class UserController {
    getUserWhereUsername = async (username: string | undefined) => {
        return await axios.get(`${appConfig.apiUrl}/chitietuser/${username}`).then((res) => {
            return res.data 
        })
    }
 
}

export const userController = new UserController()