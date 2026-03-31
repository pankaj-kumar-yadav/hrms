import { ApiKeyMiddleware } from "@/auth/apiKey";
import { loginUser, logoutUser, registerUser } from "@/controllers/userController";
import { validateRequest, ValidationSource } from "@/helpers/validator";
import { XApiPermissionMiddleware } from "@/middleware/auth/xApiPermissionMiddleware";
import { Permission } from "@/models/apiKeyModel";
import { userLoginSchema, userRegisterSchema } from "@/schemas/userSchema";
import { Router } from "express";

const router: Router = Router();

router.use(ApiKeyMiddleware);
router.use(XApiPermissionMiddleware(Permission.GENERAL));

router.post("/register", validateRequest(userRegisterSchema, ValidationSource.BODY), registerUser);
router.post("/login", validateRequest(userLoginSchema, ValidationSource.BODY), loginUser);
router.post("/logout", logoutUser);

export default router;
