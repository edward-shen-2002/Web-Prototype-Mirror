"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = mongoose_1.model('AppSysRole', new mongoose_1.Schema({
    // id              : { type: Number},
    appId: { type: Number },
    sysId: { type: Number },
}, { minimize: false }));
//# sourceMappingURL=AppSysRole.js.map