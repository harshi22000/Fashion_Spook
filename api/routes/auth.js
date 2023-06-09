const router = require("express").Router();
const User = require("../models/User");
const Crypto = require("crypto-js");
const { findOne } = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req,res)=>
{
    const newUser = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: Crypto.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
        });

        try{
            const savedUser = await newUser.save();
            // console.log(savedUser);
            res.status(201).json(savedUser);
        }
        catch(err){
            // console.log(err);
            res.status(500).json(err);
        }

});

router.post("/login",async  (req,res)=>{
    try{
        const user = await User.findOne({ username:req.body.username });
        !user && res.status(401).json("Wrong credentials");

        const hashpasswrd = Crypto.AES.decrypt(user.password, process.env.PASS_KEY);
        const Originalpassword = hashpasswrd.toString(Crypto.enc.Utf8);

        Originalpassword !== req.body.password && res.status(401).json("Wrong credentials");
        
        const accessToken = jwt.sign(
            {
            id:user._id, 
            isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SECKEY,
            {expiresIn:"69d"}
        );
        const { password, ...others }= user._doc;
        res.status(200).json({...others, accessToken});
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});


module.exports = router;