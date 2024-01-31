const jwt = require('jsonwebtoken')

const jwtMiddleware =(req,res,next)=>{
    console.log('Inside jwtMidlleware');
    console.log(req.headers['authorization']);
    try{
        const token = req.headers['authorization'].split(" ")[1]

        const jwtResponse = jwt.verify(token,process.env.JWT_SECRET_CODE)
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    }catch{
        res.status(401).json("Authorization failed!!! please login")
    }

}
module.exports = jwtMiddleware