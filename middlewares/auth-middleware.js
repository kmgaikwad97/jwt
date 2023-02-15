const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

var checkUserAuth = async(req,res,next)=>{
    let token const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try{
            // Get Token From header
            token = authorization.split('')[1]

            // Verify Token 
            const {userId} = jwt.verify(token,process.env.JWT_SECRET_KEY)

            // Get User From Token
            req.user = await UserModel.findById(userId).select(-password)
        }catch(err){
            console.log(err);
            res.status(401).send({"status":"failed","message":"UnAuthorized User."})
        }
    }
    if(!token){
        res.status(401).send({"status":"failed","message":"UnAuthorized User, No Token."})
        
    }
}
