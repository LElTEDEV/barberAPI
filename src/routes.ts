import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

export const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.post("/session", new AuthUserController().handle);
