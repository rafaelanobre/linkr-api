import { Router } from "express";
import  validateSchema  from "../middlewares/validateSchema.js";
import { schemasignin, schemasignup } from "../schemas/auth.schemas.js";
import { getUsers, getUsersProfile, signin, signup } from "../controllers/auth.controller.js";

const authrouter = Router();

authrouter.post("/", validateSchema(schemasignin), signin);
authrouter.post("/sign-up", validateSchema(schemasignup), signup);
authrouter.get("/users/:name/:id", getUsers);
authrouter.get("/usersProfile/:id", getUsersProfile);
export default authrouter;