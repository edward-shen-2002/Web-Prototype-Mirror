"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Schema.Types.ObjectId;
exports.default = mongoose_1.model('UserSYSRole', new mongoose_1.Schema({
    // id                : { type: Number},
    userId: { type: Number },
    appSysRoleId: { type: Number },
    orgId: { type: Number },
    program: { type: ObjectId },
}, { minimize: false }));
//# sourceMappingURL=UserSYSRole.js.map