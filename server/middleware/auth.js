const jwt = require("jsonwebtoken")


const auth = (req,res,next)=>{
  try{
      const token = req.header("Authorization")
      if(!token) return res.status(400).json({msg:"Invalid Authentications because token is not present in headers "})

        console.log("Token received:", token); // Log the token

      jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
        if(err) return res.status(400).json({msg:"Invalid Authentication "})

        req.user = user
        next()
      })
  }
  catch(err){
    res.status(401).json({msg:"Not authorized"})
  }
}

module.exports = auth;