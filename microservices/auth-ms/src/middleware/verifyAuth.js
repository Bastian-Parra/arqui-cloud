import { verifyToken } from "../utils/jwt.js"

export const verifyAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            error: 'Token requerido'
        })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
        return res.status(401).json({ error: "Token invalido" })
    }

    req.user = decoded
    next()
}