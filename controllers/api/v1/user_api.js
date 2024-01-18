const User = require('../../../models/user');

//used to send token 
const jwt = require('jsonwebtoken');

module.exports.createSession  = async function(req,res){

    try{
        let user = await User.findOne({email : req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message : "Invalid username or password"
            })
        }else{
            return res.json(200, {
                message : "sign in successfully here is your token, please keep it safe",
                data : {
                    // token consist of three part : header.payload.signature  
                    // header contains algorithm to encrypt user data or payload
                    // payload contains user specific data like email, password etc encrypted.
                    // signature is a combination of header and payload
                    token : jwt.sign(user.toJSON(), 'Codeial', {expiresIn : '100000'})
                }
            })
        }
    }catch(err){
        console.log("*******", err);
        return res.json(500, {
            message : "Internal Server Error"
        });
    }

}