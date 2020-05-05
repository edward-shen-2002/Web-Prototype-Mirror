"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var passport_local_mongoose_1 = require("passport-local-mongoose");
// TODO : Replace with https://github.com/dropbox/zxcvbn
var passwordValidator = function (password, cb) {
    // Symbols by ASCII ranges (http://www.asciitable.com/)
    var isGreaterThanMinLength = password.length > 7;
    var isLessThanMaxLength = password.length < 26;
    var containsSymbolRegex = /[$-/:-@{-~!'^_`\[\]]/;
    var containsCapitalRegex = /[A-Z]/;
    var error;
    if (!isLessThanMaxLength) {
        error = 'Password has to be at least 8 characters long';
    }
    else if (!isGreaterThanMinLength) {
        error = 'Password has to be no more than 28 characters long';
    }
    else if (!containsSymbolRegex.test(password)) {
        error = 'Password has to contain at least one symbol';
    }
    else if (!containsCapitalRegex) {
        error = 'Password has to contain at least one capital character';
    }
    return error ? cb(error) : cb();
};
// Conditions to check for when the user authenticates/logs in
var findByUsername = function (model, queryParameters) { return (model.findOne(__assign(__assign({}, queryParameters), { isActive: true, isVerified: true }))); };
var User = new mongoose_1.Schema({
    // id                : { type: Number, required: true },
    userName: { type: String, lowercase: true, required: true },
    email: { type: String, required: true },
    title: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    //
    // organizations     : { type: Object, default: {} },
    active: { type: Boolean, required: true, default: false },
    isVerified: { type: Boolean, required: true, default: false },
    createDate: { type: Date, default: Date.now, required: true },
    approveDate: { type: Date, default: Date.now, required: true },
    startDate: { type: Date, default: Date.now, required: true },
    endDate: { type: Date, default: Date.now, required: true },
}, { minimize: false });
User.plugin(passport_local_mongoose_1.default, { usernameUnique: false, findByUsername: findByUsername, passwordValidator: passwordValidator });
exports.default = mongoose_1.model('User', User);
/**
 Organization: {
        $[organization]: {

          programs: {
            $[program]: {
              submissions: {
                $[submission]
              }
            }
          }

        }
      }
 */
//# sourceMappingURL=User.js.map