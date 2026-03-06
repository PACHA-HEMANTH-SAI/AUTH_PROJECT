import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, nxt) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(400).json({success: false, message: "Unauthorized - no token provided"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            res.status(401).json({success: false, message : "Unauthorized - Invalid token"})
        }
        req.userId = decoded.userId;
    }catch(error) {
        console.log('error in verify token ',error);
        res.status(400).json({success : false, message : "server error"});
    }
    nxt();
}