const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const usermodel = require('../models/userModel');

const signup = async (req,res)=>{
    try {
        const {name, email, password, role} = req.body;
        
        // chacking if user alrewady exists
        const existingUser = await usermodel.findOne({email: email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            });
        }

        // Securing the password/ hashing the password
        let hashedPassword;
        try{
             hashedPassword = await bcrypt.hash(password, 10)
        }
        catch(e){
            return res.status(500).json({
                success: false,
                message: "Error while hashing the password"
            });
        }
        
        // creating the user
        const newUser = await usermodel.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        })

        return res.status(200).json({
            success: true,
            message: "Account created successfully",
            data : newUser
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "User could not be registered, please try again",
        });
    }
}



const login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        //checking if email or password are empty
        if(!email || !password){
            return res.status(400).json({
            success: false,
            message: "Please fill email and password"
            })
        }

        // checking if user is present or not
        const user = await usermodel.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
                })
        }

        // verifying password and generating jwt token
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if(isCorrect){
            // creating a jwt token
            let token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "2h"});

            // user.toObject(); 
            user.token  = token;
            user.password = undefined; //note: We are not updating with data present in db, rather we are updating the user that we got by matching the value of email above, so dont get confused

            // creating a cookie, a cookie takes 3 things, cookie name, cookie data, cookie options like expires and etc
            const options ={
                expires: new Date(Date.now() + 30000),
                httpOnly: true,
            }
            res.cookie("newCookie", token, options).status(500).json({
                success: true,
                token: token,
                userData: user, 
                message: "User logged in successfully"
            })
        }
        else{
            return res.status(403).json({
                success: false,
                message: "Password did not match"
                })
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Log in failuire"
            })
    }
}
module.exports = {signup, login};