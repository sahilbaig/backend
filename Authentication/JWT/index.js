const express = require('express')
const JWT  =require('jsonwebtoken')
var bodyParser = require('body-parser');
const app  = express()


// This is for parsing body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Steps:
// 1. Create a JWT -> JWT.sign(data, secret_key)
// 2. Create middleware to check if JWT is verified from req.header 
// 3. If it is verified -> Show post , else -> send not authorized


const AuthenticateToken = (req,res, next) =>{
    const authToken = req.body.authToken
    JWT.verify(authToken , secret_key , (err)=>{
        if(err){
            return res.json({"status": 401 , "Message": "Not verified"})
        }
        next()
    })
}
const secret_key = "verySecretKey"  // This should be a secret key in process.env

app.get('',(req,res)=>{
    const username = {"username": "username"}
    const AccessToken =JWT.sign(username, secret_key) 
    res.json({"AuthToken":AccessToken} )
})

app.post('/posts',AuthenticateToken, (req,res)=>{
    res.json({"status" : 200 , "message": "User is verified"})
})

app.listen(3000 ,()=>{
    console.log("server running at 3000")
} )

