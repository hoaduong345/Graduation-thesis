import axios from "axios"
import { Rate, Rating } from "../Model/RatingAndComment"

export const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_URL || ''
}
class RatingAndComment {
    postRatingAndComment = async (data: Rating) => {
        return await axios.post(`${appConfig.apiUrl}/rating`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        }).then((res) => {
            return res.data
        })
    }

    getRatingAndComment = async (id: number): Promise<Rate> => {
        return await axios.get(`${appConfig.apiUrl}/ratingcomment/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        }).then((res) => {
            return res.data as Rate
        })
    }

    EditRatingAndComment = async (id: number, data: Rating) => {
        return await axios.put(`${appConfig.apiUrl}/updateratingcomment/${id}`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        })
    }

    RemoveRatingAndComment = async (id: number) => {
        return await axios.delete(`${appConfig.apiUrl}/deleteratingcomment/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        })
    }


}

export const RatingAndCommentController = new RatingAndComment()