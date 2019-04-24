import { Router } from "express";
import LogController from "../controllers/LogController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import ReceiverController from "../controllers/ReceiverController";


const router = Router();

//Get all logs
router.get("/", LogController.listAll);

//Create log about incomplete intake moment
router.get("/createIncompleteLog",LogController.createIncompleteIntakeMomentLog);

export default router;
