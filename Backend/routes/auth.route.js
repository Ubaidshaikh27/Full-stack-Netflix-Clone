import express from"express";
import { logout, signup, login, authCheck } from "../controllers/auth.controller.js"; //type == module, that is why always use the file type".js" or else it will crash
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/signup",signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);

export default router;