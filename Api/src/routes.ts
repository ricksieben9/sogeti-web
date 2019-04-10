import {userGetAll, userGetById} from "./repository/UserRepository";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/users",
        method: "get",
        action: userGetAll
    },
    {
        path: "/user/:id",
        method: "get",
        action: userGetById
    }
];
