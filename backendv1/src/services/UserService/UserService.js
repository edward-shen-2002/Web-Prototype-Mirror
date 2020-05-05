"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var User_1 = require("../../entities/User");
var UserService = /** @class */ (function () {
    function UserService(UserRpository) {
        this.UserRpository = UserRpository;
    }
    UserService.prototype.register = function (
    // JS User object
    ) {
        try {
            this.UserRpository.create(new User_1.default( /**User Object parameters */));
        }
        catch (error) {
            throw "Failed to register user\n" + error;
        }
    };
    UserService.prototype.login = function (username) {
        this.UserRpository.findActiveUserByUsername(username);
    };
    UserService.prototype.logout = function () { };
    UserService.prototype.verifyEmail = function () { };
    UserService.prototype.changePassword = function () { };
    UserService = __decorate([
        typedi_1.Service()
    ], UserService);
    return UserService;
}());
exports.default = UserService;
//# sourceMappingURL=UserService.js.map