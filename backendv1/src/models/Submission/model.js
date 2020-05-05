"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Schema.Types.ObjectId;
exports.default = mongoose_1.model('Submission', new mongoose_1.Schema({
    name: { type: String },
    organizationID: { type: ObjectId, ref: 'Organization' },
    templateID: { type: ObjectId, ref: 'Template' },
    programID: { type: ObjectId, ref: 'Program' },
    workbookData: { type: Object },
    phase: { type: String, default: 'edit' },
    status: { type: String, default: 'TBD' },
    isPublished: { type: Boolean, default: false }
}, { minimize: false, timestamps: true }));
//# sourceMappingURL=model.js.map