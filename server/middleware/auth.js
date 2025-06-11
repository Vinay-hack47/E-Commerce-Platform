// const jwt = require("jsonwebtoken")


// const auth = (req,res,next)=>{
//   try{
//       const token = req.header("Authorization") 

      
//       if(!token) return res.status(400).json({msg:"Invalid Authentications because token is not present in headers "})

//         console.log("Token received vinay:", token); // Log the token

//       jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
//         if(err) return res.status(400).json({msg:"Invalid Authenticationvinay "})

//         req.user = user;
//         console.log(req.user)
//         next();
//       });
//   }
//   catch(err){
//     res.status(401).json({msg:"Not authorized"})
//   }
// }

// module.exports = auth;


const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(400).json({ msg: "Authentication failed: Token not provided" });
    }

    console.log("Received Token vinay:", token);

    // Remove "Bearer " prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];  // Extract actual token
    }

    console.log("Extracted Token vinay:", token);

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    if (!decoded) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    console.log("Decoded Token Data:", decoded);

    req.user = decoded;  // Attach decoded data to request
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(401).json({ msg: "Authorization failed" });
  }
};

module.exports = auth;
