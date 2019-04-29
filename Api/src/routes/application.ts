import {Router} from "express";
import {checkJwt} from "../middlewares/checkJwt";
import ApplicationController from "../controllers/ApplicationController";
import UserController from "../controllers/UserController";

const router = Router();
// get all application
router.get("/", [checkJwt], ApplicationController.getAllApplicationsByDispenser);

// get all details of application
router.get("/:id([0-9]+)", [checkJwt], ApplicationController.getApplicationDetail);

// set completed
router.patch("/:id([0-9]+)", [checkJwt], ApplicationController.setCompleted);

// remove completed
router.delete("/:id([0-9]+)", [checkJwt], ApplicationController.removeCompleted);

export default router;
