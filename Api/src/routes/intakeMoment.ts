import { Router } from "express";
import IntakeMomentController from "../controllers/IntakeMomentController";


const router = Router({mergeParams: true});

//Get all intake Moments
router.get("/", IntakeMomentController.getAllIntakeMomentsOfReceiver);


// Get one intake moment
router.get(
    "/:intakeMomentId([0-9]+)",IntakeMomentController.getOneById
);

//Create a new intake moment
router.post("/",IntakeMomentController.newIntakeMoment);

//Edit one intake moment
router.patch("/:intakeMomentId([0-9]+)",IntakeMomentController.editIntakeMoment);

//Delete one intake moment
router.delete("/:intakeMomentId([0-9]+)",IntakeMomentController.deleteIntakeMoment);

export default router;
