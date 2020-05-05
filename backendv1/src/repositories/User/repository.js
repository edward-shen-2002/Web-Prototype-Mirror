"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.create = function (username, email, title, firstName, lastName, phoneNumber
    // organizations   : object
    , 
    // organizations   : object
    active, isVerified, createDate, approveDate, startDate, endDate) {
        throw new Error("Method not implemented.");
    };
    UserRepository.prototype.update = function (id, item) {
        throw new Error("Method not implemented.");
    };
    UserRepository.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    UserRepository.prototype.find = function (item) {
        throw new Error("Method not implemented.");
    };
    UserRepository.prototype.findOne = function (id) {
        throw new Error("Method not implemented.");
    };
    UserRepository = __decorate([
        typedi_1.Service()
    ], UserRepository);
    return UserRepository;
}());
exports.default = UserRepository;
//# sourceMappingURL=repository.js.map