import { Router } from "express";
import  validateSchema  from "../middlewares/validateSchema.js";
import { schemasignin, schemasignup } from "../schemas/auth.schemas.js";
import { signin, signup } from "../controllers/auth.controller.js";

const authrouter = Router();

authrouter.post("/", validateSchema(schemasignin), signin);
authrouter.post("/sign-up", validateSchema(schemasignup), signup);

export default authrouter;