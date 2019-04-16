import { Router } from "express";
import IntakeMomentController from "../controllers/IntakeMomentController";


const router = Router();

//Get all intake Moments
router.get("/", IntakeMomentController.listAll);


// Get one intake moment
router.get(
    "/:id([0-9]+)",IntakeMomentController.getOneById
);

//Create a new intake moment
router.post("/",IntakeMomentController.newIntakeMoment);

//Edit one intake moment
router.patch("/:id([0-9]+)",IntakeMomentController.editIntakeMoment);

//Delete one intake moment
router.delete("/:id([0-9]+)",IntakeMomentController.deleteIntakeMoment);

export default router;
