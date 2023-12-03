const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const decode = require('jwt-decode');
dotenv.config();

const OAuth2Controller = {
    getOauthGooleToken: async (code) => {
        const body = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_AUTHORIZED_REDIRECT_URI,
            grant_type: 'authorization_code',
        };
        const { data } = await axios.post('https://oauth2.googleapis.com/token', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return data;
    },
    /**
     * Hàm này thực hiện gửi yêu cầu lấy thông tin người dùng từ Google dựa trên Google OAuth token.
     * @param {Object} tokens - Đối tượng chứa Google OAuth token.
     * @param {string} tokens.id_token - ID token được lấy từ Google OAuth.
     * @param {string} tokens.access_token - Access token được lấy từ Google OAuth.
     * @returns {Object} - Đối tượng chứa thông tin người dùng từ Google.
     */
    getGoogleUser: async ({ id_token, access_token }) => {
        const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            params: {
                access_token,
                alt: 'json',
            },
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });
        return data;
    },

    loginWithGoogle: async (req, res, next) => {
        try {
            const { code } = req.query;
            const data = await getOauthGooleToken(code); // Gửi authorization code để lấy Google OAuth token
            const { id_token, access_token } = data; // Lấy ID token và access token từ kết quả trả về
            const googleUser = await getGoogleUser({ id_token, access_token }); // Gửi Google OAuth token để lấy thông tin người dùng từ Google

            // Kiểm tra email đã được xác minh từ Google
            if (!googleUser.verified_email) {
                return res.status(403).json({
                    message: 'Google email not verified',
                });
            }

            // Tạo manual_access_token và manual_refresh_token sử dụng JWT (JSON Web Token)
            const manual_access_token = jwt.sign(
                { email: googleUser.email, type: 'access_token' },
                process.env.SECRECT_KEY,
                { expiresIn: '30m' }
            );
            const manual_refresh_token = jwt.sign(
                { email: googleUser.email, type: 'refresh_token' },
                process.env.JWT_REFRESH_TOKEN,
                { expiresIn: '30d' }
            );

            // Redirect người dùng về trang login với access token và refresh token
            return res.redirect(
                `http://localhost:5000/login/oauth?access_token=${manual_access_token}&refresh_token=${manual_refresh_token}`
            );
        } catch (error) {
            next(error);
        }
    },
};
module.exports = OAuth2Controller;
