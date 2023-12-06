const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const OAuth2Controller = {
    // CHECK EXPRIED REFRESH TOKEN
    isRefreshTokenExpired: (refreshToken) => {
        const decoded = jwt.decode(refreshToken);

        if (decoded && decoded.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime;
        }

        return true; // Treat as expired if there's no expiration claim
    },
    // CHECK EXPRIED ACCESS TOKEN
    isAccessTokenExpired: (accesstoken) => {
        const decoded = jwt.decode(accesstoken);

        if (decoded && decoded.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime;
        }

        return true; // Treat as expired if there's no expiration claim
    },
        // GENERATE ACCESS TOKEN
        genereateAccessToken: (email) => {
            return jwt.sign(
                {
                    email: email,
                },
                process.env.SECRECT_KEY,
                { expiresIn: '30m' }
            );
        },
        // GENERATE REFRESH TOKEN
        genereateRefreshToken: (email) => {
            return jwt.sign(
                {
                    email: email,
                },
                process.env.JWT_REFRESH_TOKEN,
                { expiresIn: '30d' }
            );
        },
   saveGoogleUserToDB : async(req,res) =>{
    try {
        const { name, email,username } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                email : email
            }
        })
        console.log("🚀 ~ file: OAuth2Controller.js:57 ~ saveGoogleUserToDB:async ~ user:", user)
        let refreshToken = OAuth2Controller.genereateRefreshToken(email);
        if(!user){
            console.log("aaaaaaaaaaaaaaa",refreshToken)
          const newUser =  await prisma.user.create({
                data:{
                    email : email,
                    name : name,
                    verify : true,
                    username : username,
                    refresh_token : refreshToken
                }
            })
            res.status(200).send(newUser)
        }else{
            const checkRefreshTokenExpired = OAuth2Controller.isRefreshTokenExpired(user.refresh_token)
            if(checkRefreshTokenExpired == false){
                await prisma.user.update({
                    where:{
                        email : user.email
                    },
                    data:{
                        refresh_token : refreshToken
                    }
                })
            }
            res.status(200).send("Welcome back")
        }
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
   },
   saveToCookies : async(req,res) =>{
    try {
        const { name, email,username } = req.body;
        console.log("EMAIL?::"+email);
        const user = await prisma.user.findFirst({
            where:{
                email : email
            }
        })
        const accessToken = OAuth2Controller.genereateAccessToken(email)
        res.cookie('accesstoken', accessToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
            expires: expirationDate, // Set an expiration date
        });

        res.cookie('id', user.id, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
            expires: expirationDate, // Set an expiration date
        });
        
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
   }
};
module.exports = OAuth2Controller;
