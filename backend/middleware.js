import jwt from "jsonwebtoken"
import { User } from "./db.js"

export default async function authMiddleware(req, res, next){
    let token = null
    
    if (req.cookies && req.cookies.sessionID){
        token = req.cookies.sessionID
    }
    if (!token) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(payload.id)
        
        if (!user) {
            return res.status(401).json({
                error: "Unauthorized"
            })
        }

        req.userId = payload.id
        next()

    } catch(err) {
        return res.status(401).json({
            error: "Invalid or Expired token"
        })
    }
}