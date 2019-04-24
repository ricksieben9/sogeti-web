import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
import {user} from "../entity/user";

import {log} from "../entity/log";
import {receiver} from "../entity/receiver";
import {intake_moment} from "../entity/intake_moment";

class LogController {

    static listAll = async (req: Request, res: Response) => {
        //Get logs from database
        const logRepository = getRepository(log);
        const logs = await logRepository.find();
        //Send the logs object
        res.send(logs);
    };


    static createIncompleteIntakeMomentLog = async (req: Request, res: Response) => {
        let newLog = new log();

        newLog.category = "test";
        newLog.message = "nieuwe log";

        //Validade if the parameters are ok
        const errors = await validate(newLog);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the error is reported back
        const logRepository = getRepository(log);
        try {
            await logRepository.save(newLog);
        } catch (e) {
            res.status(409).send(e);
            return;
        }

        //If all ok, send 201 response
        res.status(201).send({"response": "Log was created"});
    };}



export default LogController;
