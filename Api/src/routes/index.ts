import { Router, Request, Response } from "express";
import auth from "./auth";
import conn from "./conn";
import user from "./user";
import receiver from "./receiver";
import medicine from "./medicine";

const routes = Router();

routes.use("/auth", auth);
routes.use('/conn', conn);
routes.use("/user", user);
routes.use("/receiver", receiver);
routes.use("/medicine", medicine);

export default routes;
