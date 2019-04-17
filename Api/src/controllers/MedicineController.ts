import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {medicine} from "../entity/medicine";
import {receiver} from "../entity/receiver";

class MedicineController {


    static listAll = async (req: Request, res: Response) => {
        //Get receivers from database
        const medicineRepository = getRepository(medicine);
        const medicines = await medicineRepository.find();

        //Send the receivers object
        res.send(medicines);
    };

    static newMedicine = async (req: Request, res: Response) => {
        //Get parameters from the body
        const {name, unit, desc} = req.body;

        let Medicine = new medicine();
        Medicine.name = name;
        Medicine.unit = unit;
        Medicine.description = desc;

        console.log(Medicine);
        //Validade if the parameters are ok
        const errors = await validate(Medicine);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the receivername is already in use
        const medicineRepository = getRepository(medicine);
        try {
            await medicineRepository.save(Medicine);
        } catch (e) {
            res.status(409).send({"response": "Naam is al in gebruik."});
            return;
        }

        //If all ok, send 201 response
        res.status(201).send({"response": "Medicine created"});
    };

}

export default MedicineController;
