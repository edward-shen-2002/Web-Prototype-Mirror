"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = mongoose_1.model('Year', new mongoose_1.Schema({
    value: { type: String }
}, { minimize: false }));
//# sourceMappingURL=model.js.map