
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import * as socketio from 'socket.io';

//Connects to the Database -> then starts the express
createConnection()
    .then(async connection => {
        // Create a new express application instance
        const app = express();
        const http = require('http').createServer(app);
        const io = require('socket.io')(http);

        // Call midlewares
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        app.use(function (request, response, next) {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        //Set all routes from routes folder
        app.use("/", routes);

        http.listen(3000, () => {
            console.log("Server started on port 3000!");
        });

        io.on('connection', (socket) => {
            console.log('device connected');
        });
    })
    .catch(error => console.log(error));
