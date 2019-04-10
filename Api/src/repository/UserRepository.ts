import {Request, Response} from "express";
import {getManager} from "typeorm";
import {user} from "../entity/user";


/**
 * Loads all users from the database.
 */
export async function userGetAll(request: Request, response: Response) {
    // get a post repository to perform operations with user
    let userRepository = getManager().getRepository(user);

    // load a post by a given post id
    const users = await userRepository.find();

    // return loaded posts
    response.send(users);
}

/**
 * Loads user by a given id.
 */
export async function userGetById(request: Request, response: Response) {
    // get a post repository to perform operations with user
    const userRepository = getManager().getRepository(user);

    // load a user by a given post id
    const users = await userRepository.findOne(request.params.id);

    // if user was not found return 404 to the client
    if (!users) {
        response.status(404);
        response.end();
        return;
    }

    // return loaded post
    response.send(users);
}

/**
 * Saves given user.
 */
export async function userSave(request: Request, response: Response) {

    // get a post repository to perform operations with user
    const userRepository = getManager().getRepository(user);

    // create a real user object from post json object sent over http
    const newUser = userRepository.create(request.body);

    // save received post
    await userRepository.save(newUser);

    // return saved post back
    response.send(newUser);
}
