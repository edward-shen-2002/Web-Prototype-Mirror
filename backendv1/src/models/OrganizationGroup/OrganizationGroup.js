"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = mongoose_1.model('OrganizationGroup', new mongoose_1.Schema({
    id: { type: Number },
    name: { type: String, required: true, unique: true }
}, { minimize: false }));
//# sourceMappingURL=OrganizationGroup.js.map