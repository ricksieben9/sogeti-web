import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import receiver from "./receiver";
import log from "./log";
import medicine from "./medicine";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/receiver", receiver);
routes.use("/log", log);
routes.use("/medicine", medicine);

export default routes;
