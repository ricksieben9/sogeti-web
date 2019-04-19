import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {log} from "../entity/log";

class LogController {

    static listAll = async (req: Request, res: Response) => {
        //Get logs from database
        const logRepository = getRepository(log);
        const logs = await logRepository.find();

        //Send the receivers object
        res.send(logs);
    };

    // static getOneById = async (req: Request, res: Response) => {
    //     //Get the ID from the url
    //     const id: number = req.params.id;
    //
    //     //Get the receiver from database
    //     const notificationRepository = getRepository(receiver);
    //     try {
    //         const Receiver = await notificationRepository.createQueryBuilder().select(["id", "name"]).where({id: id}).getRawMany();
    //         res.send(Receiver);
    //
    //     } catch (error) {
    //         res.status(404).send("Receiver not found");
    //     }
    // };
}

export default LogController;
