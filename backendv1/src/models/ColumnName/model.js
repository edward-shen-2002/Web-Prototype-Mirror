"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = mongoose_1.model('ColumnName', new mongoose_1.Schema({
    value: { type: String, required: true }
}, { minimize: false }));
//# sourceMappingURL=model.js.map