"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var products_1 = __importDefault(require("./handlars/products"));
var brand_1 = __importDefault(require("./handlars/brand"));
var catogery_1 = __importDefault(require("./handlars/catogery"));
var users_1 = __importDefault(require("./handlars/users"));
var coupon_1 = __importDefault(require("./handlars/coupon"));
var orders_1 = __importDefault(require("./handlars/orders"));
var feedback_1 = __importDefault(require("./handlars/feedback"));
dotenv_1.default.config();
//initial port and app
var port = process.env.port || 5000;
var app = (0, express_1.default)();
//usig middel ware cors and body parser
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//configre the server to listen to port and running it
app.listen(port, function () {
    console.log("server running on port ".concat(port));
});
//run modules of the project
//userRoute(app);
//orderRoute(app);
(0, feedback_1.default)(app);
(0, products_1.default)(app);
(0, brand_1.default)(app);
(0, coupon_1.default)(app);
(0, users_1.default)(app);
(0, catogery_1.default)(app);
(0, orders_1.default)(app);
//export the app to use when importing the file
exports.default = app;
