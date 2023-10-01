import jwt from "jsonwebtoken";

export const verifyToken = async(req, res, next) => {
    try{
        /* This will be set in front end and it will be grabbed like this */
        let token = req.header("Authorization");
        if(!token){
            return res.status(403).send("Access denied");
        }
        /* Again set in front end */
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}