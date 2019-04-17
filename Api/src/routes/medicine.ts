import { Router } from "express";
import MedicineController from "../controllers/MedicineController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";



const router = Router();


//Create a new medicine
router.post("/",MedicineController.newMedicine);



export default router;
