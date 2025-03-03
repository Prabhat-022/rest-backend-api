import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {

    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) return res.status(401).json({
        error: 'Access denied'
    })

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;

        next();
    } catch (error) {
        res.status(401).json({
            error: 'Invalid token'
        })

    }
}

export default authenticate;