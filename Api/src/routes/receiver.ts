import { Router } from "express";
import ReceiverController from "../controllers/ReceiverController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";


const router = Router();

//Get all users
router.get("/", ReceiverController.listAll);

// Get one user
router.get(
    "/:id([0-9]+)",
    //[checkJwt, checkRole(["ADMIN"])],
    ReceiverController.getOneById
);

//Create a new user
router.post("/",ReceiverController.newReceiver);

//Edit one user
router.patch(
    "/:id([0-9]+)",
   // [checkJwt, checkRole(["ADMIN"])],
    ReceiverController.editReceiver
);

//Delete one user
router.delete(
    "/:id([0-9]+)",
   // [checkJwt, checkRole(["ADMIN"])],
    ReceiverController.deleteReceiver
);

export default router;
