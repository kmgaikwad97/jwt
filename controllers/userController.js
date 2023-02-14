const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController{
    static userRegistration = async(req,res)=>{
        const {name,email,password,password_confirmation,tc} = req.body;
        const user = await UserModel.findOne({email:email})        
        if(user){
            res.status(201).send({"status":"failed","message":"Email Already Exist."})
        }else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    try{
                        const salt = await bcrypt.genSalt(12);
                        const hashedPassword = await bcrypt.hash(password,salt) 
                        const doc = new UserModel({
                            name:name,
                            email:email,
                            password:hashedPassword,
                            tc:tc
                        })
                        await doc.save();
                        res.status(200).send({"status":"success","message":"Registration Successfully"})    
                        
                    }catch(err){
                        console.log("hello");
                        console.log(err);
                        res.send({"status":"failed","message":"Unable to Register"})     
                    }
                }else{
                    res.send({"status":"failed","message":"Password & Confirm Passwor Doesn't Match"})
                }
                
            }else{
                res.send({"status":"failed","message":"All Fields Are Required."})
            }
        }
    }

    static userLogin = async(req,res)=>{
        try{
            const {email,password} = req.body 
            if(email && password){
                const user = await UserModel.findOne({email:email})
                if(user != null){
                    const isMatch = await bcrypt.compare(password,user.password)
                        if((user.email === email) && isMatch){
                            res.send({"status":"success","message":"Login Successful."})    
                        }else{
                            res.send({"status":"failed","message":"Email or Password is not Valid."})
                        }
                    
                }else{
                    res.send({"status":"failed","message":"You are not Registered User."})
                }
            }else{
                res.send({"status":"failed","message":"All Fields Are Required."})
            }
        }catch(err){
            console.log(err);
            res.send({"status":"failed","message":"Unable to Login."})
        }
    }
}

module.exports = UserController
// export default UserController
