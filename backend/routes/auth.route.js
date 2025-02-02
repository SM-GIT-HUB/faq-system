import express from "express"
import { getUser, login, logout, signup } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get('/getuser', protectRoute, getUser);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', protectRoute, logout);


export default router