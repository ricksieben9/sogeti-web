import {Request, Response} from "express";
import {getManager} from "typeorm";
import {receiver} from "../entity/receiver";


/**
 * Loads all receivers from the database.
 */
export async function receiverGetAll(request: Request, response: Response) {
    // get a post repository to perform operations with receiver
    let receiverRepository = getManager().getRepository(receiver);

    // load a post by a given post id
    const receivers = await receiverRepository.find();

    // return loaded posts
    response.send(receivers);
}

/**
 * Loads receiver by a given id.
 */
export async function receiverGetById(request: Request, response: Response) {
    // get a post repository to perform operations with receiver
    const receiverRepository = getManager().getRepository(receiver);

    // load a receiver by a given post id
    const receivers = await receiverRepository.findOne(request.params.id);

    // if receiver was not found return 404 to the client
    if (!receivers) {
        response.status(404);
        response.end();
        return;
    }

    // return loaded post
    response.send(receivers);
}

/**
 * Saves given receiver.
 */
export async function receiverSave(request: Request, response: Response) {

    // get a post repository to perform operations with receiver
    const receiverRepository = getManager().getRepository(receiver);

    // create a real receiver object from post json object sent over http
    const newReceiver = receiverRepository.create(request.body);

    // save received post
    await receiverRepository.save(newReceiver);

    // return saved post back
    response.send(newReceiver);
}
