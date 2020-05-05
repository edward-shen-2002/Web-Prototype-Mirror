"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Schema.Types.ObjectId;
exports.default = mongoose_1.model('Program', new mongoose_1.Schema({
    // id                  : { type: Number },
    name: { type: String, required: true },
    code: { type: String, required: true },
    organizationId: [{ type: ObjectId, ref: 'Organization' }],
    isActive: { type: Boolean, default: false },
}, { minimize: false }));
//# sourceMappingURL=Program.js.map