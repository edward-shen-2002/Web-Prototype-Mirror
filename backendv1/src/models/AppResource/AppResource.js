"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = mongoose_1.model('AppResource', new mongoose_1.Schema({
    // id              : { type: Number},
    resourceName: { type: String },
    resourcePath: { type: String },
    contextRoot: { type: String },
    isProtected: { type: Boolean, default: false },
}, { minimize: false }));
//# sourceMappingURL=AppResource.js.map