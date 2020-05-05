"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = mongoose_1.model('AppSys', new mongoose_1.Schema({
    // id                : { type: Number},
    code: { type: String },
    name: { type: String }
}, { minimize: false }));
//# sourceMappingURL=AppSys.js.map