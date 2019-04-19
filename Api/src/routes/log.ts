import { Router } from "express";
import LogController from "../controllers/LogController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";


const router = Router();

//Get all logs
router.get("/", LogController.listAll);

export default router;
