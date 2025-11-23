import { Router } from "express";
import { signup, signin, refreshToken, signout } from "./auth.controller";
import { requireAuth } from "./auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh", refreshToken);
router.post("/signout", requireAuth, signout);

export default router;
