import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", loginUser);

export default router;
