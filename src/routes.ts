import { Router } from "express";

import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

export const routes = Router();

routes.get("/me", isAuthenticated, new DetailUserController().handle);
routes.post("/users", new CreateUserController().handle);
routes.post("/session", new AuthUserController().handle);
