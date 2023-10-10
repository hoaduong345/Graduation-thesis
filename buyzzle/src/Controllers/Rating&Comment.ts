import axios from "axios"

export const appConfig = {
    apiUrl: import.meta.env.VITE_BACKEND_URL || ''
}

class RatingAndComment {
    getRatingAndComment = async (id: number | undefined) => {
        return await axios.get(`${appConfig.apiUrl}/avergaeRating/${id}`).then((res) => {
            return res.data
        })
    }

}

export const RatingAndCommentController = new RatingAndComment()