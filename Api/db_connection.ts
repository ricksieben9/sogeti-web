import "reflect-metadata";
import {createConnection} from "typeorm";
import {log_category} from "./models/entities/log_category";

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    entities: [
        log_category
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    console.log("connection succeeded");
    // here you can start to work with your entities
}).catch(error => console.log(error));