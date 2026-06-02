function auth(req,res,next){
    const token = req.headers.authorization;

    if(!token){
        return res.status(400).json({msg:"Access denied. Token Required"})
    }

    if(token!=="dhvanit"){
        return res.status(401).json({msg:"Invalid token"})
    }

    console.log("successfully verified token");

    next()
}

module.exports= auth;