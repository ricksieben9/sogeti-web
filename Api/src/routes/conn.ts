import { Router } from "express";
import ConnController from "../controllers/ConnController";

const router = Router();
//Check connection
router.get("/", ConnController.checkConnection);

export default router;