"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = mongoose_1.model('TemplateType', new mongoose_1.Schema({
    name: { type: String },
    description: { type: String },
    isApprovable: { type: Boolean },
    isReviewable: { type: Boolean },
    isSubmittable: { type: Boolean },
    isInputtable: { type: Boolean },
    isViewable: { type: Boolean },
    isReportable: { type: Boolean }
}, { minimize: false, timestamps: true }));
//# sourceMappingURL=TemplateType.js.map