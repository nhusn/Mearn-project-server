const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_CODE);
    req.payload = jwtResponse.userId;
    next();
  } catch (error){
    res.status(401).json(["Authorization failed!!! please login",error]);
  }
};
module.exports = jwtMiddleware;
