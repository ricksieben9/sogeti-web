import {Request, Response} from "express";
import {getRepository} from "typeorm";

import {intake_moment} from "../entity/intake_moment";
import {medicine} from "../entity/medicine";
import {intake_moment_medicines} from "../entity/intake_moment_medicines";

class ApplicationController {

    static getAllApplicationsByDispenser = async (req: Request, res: Response) => {
        const {userId} = res.locals.jwtPayload;
        const intakeMomentRepository = getRepository(intake_moment);
        let intakeMoment;
        try {
            intakeMoment = await intakeMomentRepository.find({
                relations: ["receiver_id", "priority_number", "dispenser", "intake_moment_medicines"],
                where: {dispenser: userId}
            });
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"response": "Toedienmoment niet gevonden!"});
            return;
        }


        //Send the intake moment object
        res.status(200).send(intakeMoment);
    };

    static getApplicationDetail = async (req: Request, res: Response) => {
        const {userId} = res.locals.jwtPayload;
        const id: number = req.params.id;
        const intakeMomentRepository = getRepository(intake_moment);
        let intakeMoment;
        try {
            intakeMoment = await intakeMomentRepository.find({
                relations: ["receiver_id", "priority_number", "dispenser", "intake_moment_medicines"],
                where: {dispenser: userId, id: id}
            });
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"response": "Toedienmoment gegevens niet gevonden!"});
            return;
        }
        //Send the users object
        res.status(200).send(intakeMoment);
    };

    static setCompleted = async (req: Request, res: Response) => {
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
            res.status(404).send({"response": "Toedienmoment medicijn niet gevonden!"});
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
        //Try to safe, if fails, that means intake moment medicine already in use
        try {
            await intakeMomentMedicineRepository.save(IntakeMomentMedicine);
        } catch (e) {
            res.status(409).send({"response": "Bad request!"});
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send({"response": "Toedienmoment aangepast"});
    };

    static removeCompleted = async (req: Request, res: Response) => {
        const id = req.params.id;
        let {medicine_id} = req.body;

        const intakeMomentMedicineRepository = getRepository(intake_moment_medicines);
        let IntakeMomentMedicine: intake_moment_medicines;
        try {
            IntakeMomentMedicine = await intakeMomentMedicineRepository.findOne({
                intake_moment_id: id,
                medicine_id: medicine_id.id
            });

        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"response": "Toedienmoment medicijn niet gevonden!"});
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
        //Try to safe, if fails, that means intake moment medicine already in use
        try {
            await intakeMomentMedicineRepository.save(IntakeMomentMedicine);

        } catch (e) {
            res.status(409).send({"response": "Bad request!"});
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send({"response": "Toedienmoment aangepast"});
    };
}

export default ApplicationController;
