import {
  CREATE_USER,
  LOGIN_USER
} from "../utils/constants";
import axios, { AxiosResponse } from "axios";

interface UserData {
  email: string,
  username: string,
  password: string,
  name: string,
}

interface LoginData {
  username: string;
  password: string;
}

export const CreateUser = async (data: UserData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(CREATE_USER, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: LoginData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(LOGIN_USER, data);
    return response;
  } catch (error) {
    throw error;
  }
};