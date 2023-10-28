import axios from "axios"
import { Statistics } from "../Model/StatsModels"

export const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_STATISTICS_URL || ''
}
export interface modelStats {
    startDate?:string,
    endDate?:string,
    page?:number,
    pageSize?:number
}
class StatsControllers {
    getStats = async (data:modelStats): Promise<Statistics[]> => {
        return await axios.get(`${appConfig.apiUrl}?startDate=${data.startDate}&endDate=${data.endDate}&page=${data.page}&pageSize=${data.pageSize}`)
        .then((res) => {
            return res.data as Statistics[]
        })
    }

}
export const statsControllers = new StatsControllers()