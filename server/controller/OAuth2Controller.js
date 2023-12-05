const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const OAuth2Controller = {
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
        const { name, email } = req.body;
        await prisma.user.create({
            data:{
                email : email,
                name : name,
                verify : true,
                username : email,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
   },
};
module.exports = OAuth2Controller;
