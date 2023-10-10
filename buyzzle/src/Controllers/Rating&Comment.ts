import axios from "axios"
import { RatingComment } from "../Model/RatingAndComment"

export const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_URL || ''
}

class RatingAndComment {
    postRatingAndComment = async (data: RatingComment) => {
        return await axios.post(`${appConfig.apiUrl}/rating`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        }).then((res) => {
            return res.data
        })
    }

    getRatingAndComment = async (id: number): Promise<RatingComment[]> => {
        return await axios.get(`${appConfig.apiUrl}/ratingcomment/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }, withCredentials: true
        }).then((res) => {
            return res.data as RatingComment[]
        })
    }

}

export const RatingAndCommentController = new RatingAndComment()