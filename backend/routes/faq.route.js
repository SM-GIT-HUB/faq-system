import express from "express"
import { createFaq, deleteFaq, editFaq, getFaqs } from "../controllers/faq.controller.js"
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get('/', getFaqs);
router.post('/create', protectRoute, adminRoute, createFaq);
router.put('/:id', protectRoute, adminRoute, editFaq);
router.delete('/:id', protectRoute, adminRoute, deleteFaq);


export default router