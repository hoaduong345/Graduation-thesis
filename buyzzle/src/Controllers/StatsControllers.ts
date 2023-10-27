import axios from "axios"
import { hotProducts } from "../Model/StatsModels"

export const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_STATISTICS_URL || ''
}

class StatsControllers {
    getListHotProduct = async (date:string,page:number,pageSize:number): Promise<hotProducts[]> => {
        return await axios.get(`${appConfig.apiUrl}?date=${date}&page=${page}&pageSize=${pageSize}`).then((res) => {
            return res.data as hotProducts[]
        })
    }
}
export const statsControllers = new StatsControllers()