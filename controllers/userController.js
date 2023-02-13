const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController{
    static userRegistration = async(req,res)=>{
        const {name,email,password,password_confirmation,tc} = req.body;
        const user = await UserModel.findOne({email:email})        
        if(user){
            res.send({"status":"failed","message":"Email Already Exist."})
        }else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    try{
                        const salt = await bcrypt.genSalt(12);
                        const hashedPassword = await bycrpt.hash(password,salt) 
                        const doc = new UserModel({
                            name:name,
                            email:email,
                            password:hashedPassword,
                            tc:tc
                        })
                        await doc.save()
                    }catch(err){
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
}

