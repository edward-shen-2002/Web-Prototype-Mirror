"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = mongoose_1.model('Template', new mongoose_1.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    reportPeriod: { type: String, required: true },
    submissionCategoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'SubmissionCategory' },
    workbookData: {},
    isPublished: { type: Boolean, default: false }
}, { minimize: false }));
//# sourceMappingURL=Template.js.map