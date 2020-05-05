"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// @ts-ignore
exports.default = mongoose_1.model('AppRole', new mongoose_1.Schema({
    // id                : { type: Number},
    code: { type: String },
    name: { type: String }
}, { minimize: false }));
//# sourceMappingURL=AppRole.js.map