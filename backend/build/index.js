"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//initial port and app
var port = 5002;
var app = (0, express_1.default)();
//configre the server to listen to port and running it
app.listen(port, function () {
    console.log("srever running on port ".concat(port));
});
//export the app to use when importing the file
exports.default = app;
