import {Request, Response} from "express";
import {getRepository} from "typeorm";

import {intake_moment} from "../entity/intake_moment";
import {medicine} from "../entity/medicine";
import {intake_moment_medicines} from "../entity/intake_moment_medicines";

class ApplicationController {

    static getApplicationDetail = async (req: Request, res: Response) => {
        //const { userId } = res.locals.jwtPayload;
        const id: number = req.params.id;
        const intakeMomentRepository = getRepository(intake_moment);
        //const intakeMoment = await intakeMomentRepository.find({dispenser:userId, id:id});
        const intakeMoment = await intakeMomentRepository.find({id: id});

        //Send the users object
        res.status(200).send(intakeMoment);
    };

    static setCompleted = async (req: Request, res: Response) => {
        // const {userId} = res.locals.jwtPayload;
        const id = req.params.id;
        let {medicine_id, completed_at} = req.body;

        const intakeMomentMedicineRepository = getRepository(intake_moment_medicines);
        let IntakeMomentMedicine: intake_moment_medicines;
        try {
            IntakeMomentMedicine = await intakeMomentMedicineRepository.findOne({
                intake_moment_id: id,
                medicine_id: medicine_id.id
            });

        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"response": "intake moment medicine niet gevonden!"});
            return;
        }
        IntakeMomentMedicine.intake_moment_id = id;
        IntakeMomentMedicine.completed_at = completed_at.toString();
        //Delete the original medicine from intakeMoment
        const intakeMomentMedicinesRepository = getRepository(intake_moment_medicines);
        try {
            intakeMomentMedicinesRepository.delete({intake_moment_id: id, medicine_id: medicine_id.id});
        } catch (error) {
            res.status(409).send(error);
            return;
        }
        //Try to safe, if fails, that means username already in use
        try {
            await intakeMomentMedicineRepository.save(IntakeMomentMedicine);

        } catch (e) {
            res.status(409).send({"response": "Bad request!"});
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send({"response": "Intake moment updated"});
    };

    static removeCompleted = async (req: Request, res: Response) => {
        // const {userId} = res.locals.jwtPayload;
        const id = req.params.id;
        let {medicine_id} = req.body;

        console.log(medicine_id);
        const intakeMomentMedicineRepository = getRepository(intake_moment_medicines);
        let IntakeMomentMedicine: intake_moment_medicines;
        try {
            IntakeMomentMedicine = await intakeMomentMedicineRepository.findOne({
                intake_moment_id: id,
                medicine_id: medicine_id.id
            });

        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"response": "intake moment medicine niet gevonden!"});
            return;
        }
        IntakeMomentMedicine.intake_moment_id = id;
        IntakeMomentMedicine.completed_at = null;
        //Delete the original medicine from intakeMoment
        const intakeMomentMedicinesRepository = getRepository(intake_moment_medicines);
        try {
            intakeMomentMedicinesRepository.delete({intake_moment_id: id, medicine_id: medicine_id.id});
        } catch (error) {
            res.status(409).send(error);
            return;
        }
        //Try to safe, if fails, that means username already in use
        try {
            await intakeMomentMedicineRepository.save(IntakeMomentMedicine);

        } catch (e) {
            console.log(e);
            res.status(409).send({"response": "Bad request!"});
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send({"response": "Intake moment updated"});
    };

    // static editCompleted = async (req: Request, res: Response) => {
    //     const {userId} = res.locals.jwtPayload;
    //     const id = req.params.id;
    //
    //     //Get values from the body
    //     let intake_moment_medicine = req.body;
    //     //Try to find user on database
    //     const intakeMomentRepository = getRepository(intake_moment);
    //     let intakeMoment;
    //     try {
    //         intakeMoment = await intakeMomentRepository.findOne({dispenser: userId, id: id});
    //
    //     } catch (error) {
    //         //If not found, send a 404 response
    //         res.status(404).send({"response": "Gebruiker niet gevonden!"});
    //         return;
    //     }
    //     console.log(intakeMoment.intake_moment_medicines);
    //     //Validate the new values on model
    //     intakeMoment.intake_moment_medicines = intake_moment_medicine['intake_moment_medicine'];
    //     console.log(intakeMoment.intake_moment_medicines);
    //
    //     //Delete all original medicine from intakeMoment
    //     const intakeMomentMedicinesRepository = getRepository(intake_moment_medicines);
    //     try {
    //         intakeMomentMedicinesRepository.delete({intake_moment_id: id});
    //     } catch (error) {
    //         res.status(409).send(error);
    //         return;
    //     }
    //
    //
    //     //Try to safe, if fails, that means username already in use
    //     try {
    //         await intakeMomentRepository.save(intakeMoment);
    //
    //     } catch (e) {
    //         res.status(409).send({"response": "Bad request!"});
    //         return;
    //     }
    //     //After all send a 204 (no content, but accepted) response
    //     res.status(204).send({"response": "Intake moment updated"});
    // };
}

export default ApplicationController;
