import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import receiver from "./receiver";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/receiver", receiver);

export default routes;
