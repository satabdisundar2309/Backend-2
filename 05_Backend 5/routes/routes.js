const express = require('express')
const router = express.Router()

const {signup, login} = require('../controllers/auth')

// importing middlewares
const {authentication, isStudent, isAdmin} = require('../middlewares/middlewareAuth')

router.post("/login", login); 
router.post("/signup", signup);

// creating protected routes
router.get("/student", authentication, isStudent, (req,res)=>{
    res.json({
        success: true,
        message: "Welcome to student's dashboard"
    })
})
router.get("/admin", authentication, isAdmin, (req,res)=>{
    res.json({
        success: true,
        message: "Welcome to admint's dashboard"
    })
})

module.exports = router;