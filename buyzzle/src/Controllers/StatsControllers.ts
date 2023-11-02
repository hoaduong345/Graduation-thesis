import axios from "axios";
import { Statistics } from "../Model/StatsModels";
import { FilterDate } from "../Helper/Date/DataHelper";

export const appConfig = {
  apiUrl: import.meta.env.VITE_BACKEND_STATISTICS_URL || "",
};

class StatsControllers {
  getStats = async (data: FilterDate): Promise<Statistics[]> => {
    return await axios.post(`${appConfig.apiUrl}`, data).then((res) => {
      return res.data as Statistics[];
    });
  };
}
export const statsControllers = new StatsControllers();
