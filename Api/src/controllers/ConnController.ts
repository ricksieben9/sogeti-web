import {Request, Response} from "express";

class ConnController {
    static checkConnection = async (req: Request, res: Response) => {
        res.status(200).send(true);
    };

}

export default ConnController;
