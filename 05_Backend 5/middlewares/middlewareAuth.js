const jwt = require('jsonwebtoken')
require('dotenv').config();

const authentication = async (req, res, next)=>{
    try {
        // getting the token
        const token = req.cookies.newCookie || req.body.token || req.header("Authorization").replace("Bearer ","")

        console.log("Body: ", req.body.token);
        console.log("Cookies: ", req.cookies.newCookie);
        console.log("Header: ", req.header("Authorization"));

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token missing"
            })
        }
        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET); //it gives a decoded token value, that is the payload that we sent earlier
            console.log(decode)
            req.user = decode //basically we are adding an a key called user in the user which will store the payload data retrieved from the token, and we can further use that as well like below middlewares
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token"
        })
    }
}

const isStudent = async (req, res, next)=>{
    try {
        if(req.user.role !== "student"){
            return res.status(401).json({
                success: false,
                message: "This is a students route only"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong, user role is not true"
        })
    }
}

const isAdmin = async (req, res, next)=>{
    try {
        if(req.user.role !== "admin"){
            return res.status(401).json({
                success: false,
                message: "This is a admin route only"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong, user role is not true"
        })
    }
}

module.exports ={authentication, isAdmin, isStudent}