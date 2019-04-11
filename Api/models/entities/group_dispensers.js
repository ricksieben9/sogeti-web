"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var group_1 = require("./group");
var user_1 = require("./user");
var priority_1 = require("./priority");
var group_dispensers = /** @class */ (function () {
    function group_dispensers() {
    }
    __decorate([
        typeorm_1.ManyToOne(function (type) { return group_1.group; }, function (group) { return group.group_dispenserss; }, { primary: true, nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'groups_id' })
    ], group_dispensers.prototype, "groups_");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_1.user; }, function (user) { return user.group_dispenserss; }, { primary: true, nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'user_id' })
    ], group_dispensers.prototype, "user_");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return priority_1.priority; }, function (priority) { return priority.group_dispenserss; }, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'priority' })
    ], group_dispensers.prototype, "priority");
    group_dispensers = __decorate([
        typeorm_1.Entity("group_dispensers", { schema: "asautar_db" }),
        typeorm_1.Index("fk_Groups_has_Caregiver_Groups1_idx", ["groups_",]),
        typeorm_1.Index("fk_Group_Caregivers_User1_idx", ["user_",]),
        typeorm_1.Index("fk_Group_dispensers_Priority1_idx", ["priority",])
    ], group_dispensers);
    return group_dispensers;
}());
exports.group_dispensers = group_dispensers;
