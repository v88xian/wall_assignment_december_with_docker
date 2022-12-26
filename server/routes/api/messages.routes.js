'use strict';

let Express = require("express");

import MessageController from "../../controllers/messages.controller";

const MessageRoute = Express.Router();

MessageRoute.post("/create", MessageController.create);
MessageRoute.post("/delete", MessageController.delete);

MessageRoute.options("*", function(req, res, next){
    next();
});

module.exports = MessageRoute;