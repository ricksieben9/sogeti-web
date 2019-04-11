import {userGetAll, userGetById} from "./repository/UserRepository";
import {receiverGetAll, receiverGetById, receiverSave} from "./repository/ReceiverRepository";

/**
 * All application routes.
 */
export const AppRoutes = [
    //users
    {
        path: "/users",
        method: "get",
        action: userGetAll
    },
    {
        path: "/user/:id",
        method: "get",
        action: userGetById
    },
    //receivers
    {
        path: "/receivers",
        method: "get",
        action: receiverGetAll
    },
    {
        path: "/receiver/:id",
        method: "get",
        action: receiverGetById
    },

];
