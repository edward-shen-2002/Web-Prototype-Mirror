"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = mongoose_1.model('AppRoleResource', new mongoose_1.Schema({
    // id              : { type: Number},
    resourceId: { type: Number },
    appSysRoleId: { type: Number }
}, { minimize: false }));
//# sourceMappingURL=AppRoleResource.js.map