import express from 'express'
import { login } from '../auth.controller.js'
import { verifyAuth } from '../middleware/verifyAuth.js'

const router = express.Router()

router.post('/login', login)
router.get('/verify', verifyAuth, (req, res) => {
    res.json({ valid: true, user: req.user })
})

export default router