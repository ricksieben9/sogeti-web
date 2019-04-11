import "reflect-metadata";
// import {createConnection} from "typeorm";
// //import {log_category} from "./models/entities/log_category";

export function test() {
    return "test";
}

// createConnection({
//     type: "mysql",
//     host: "databases.aii.avans.nl",
//     port: 3306,
//     username: "asautar",
//     password: "Ab12345",
//     database: "asautar_db",
//     entities: [
//         log_category
//     ],
//     synchronize: true,
//     logging: false
// }).then(connection => {
//     console.log("connection succeeded");
//     //let category = new log_category();
//     //category.name = "Toedienmoment";
//     // here you can start to work with your entities
// }).catch(error => console.log(error)); 