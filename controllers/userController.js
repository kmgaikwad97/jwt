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
                        const saved_user = await UserModel.findOne({email:email}) 
                        // Genearate JWT Token 
                        const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                        res.status(200).send({"status":"success","message":"Registration Successfully","token":token})    
                        
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

                            // Generate JWT Token 
                            const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                        res.status(200).send({"status":"success","message":"Registration Successfully","token":token}) 

                            res.send({"status":"success","message":"Login Successful.","token":token})    
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

    static changeUserPassword = async(req,res)=>{
        const {password,password_confirmation} = req.body
        if(password !== password_confirmation){
            res.send({"status":"failed","message":"New Password & Confirm Password doesn't match."})
        }else{
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password,salt) 
        }
    }
}

module.exports = UserController
// export default UserController
