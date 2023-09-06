import { CREATE_USER } from "../utils/constants";
import axios, { AxiosResponse } from "axios";

interface UserData {
    email : string,
    username : string,
    password : string,
    name : string ,
    
   
}

export const CreateUser = async (data: UserData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(CREATE_USER, data);
    return response;
  } catch (error) {
    throw error;
  }
};