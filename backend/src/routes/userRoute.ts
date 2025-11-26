import express from "express"
import { authMe, updateUserProfile } from "../controllers/userController.ts";

const router = express.Router();

router.get('/me', authMe);
router.put('/update', updateUserProfile);

export default router;