"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Schema.Types.ObjectId;
exports.default = mongoose_1.model('Organization', new mongoose_1.Schema({
    // id                  : { type: Number },
    IFISNum: { type: String, default: '' },
    name: { type: String, required: true },
    legalName: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    address: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    provice: { type: String, default: '' },
    city: { type: String, default: '' },
    organizationGroupId: { type: ObjectId, ref: 'OrganizationGroup' },
    contactUserId: { type: ObjectId, ref: 'User' },
    CFOUserId: { type: ObjectId, ref: 'User' },
    signingAuthorityUserId: { type: ObjectId, ref: 'User' },
    location: { type: String, default: '' },
    programIds: [{ type: ObjectId, ref: 'Program' }],
    isActive: { type: Boolean, default: false }
}, { minimize: false }));
//# sourceMappingURL=Organization.js.map