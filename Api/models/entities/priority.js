"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var timetonotificate_1 = require("./timetonotificate");
var group_dispensers_1 = require("./group_dispensers");
var intake_moment_1 = require("./intake_moment");
var priority = /** @class */ (function () {
    function priority() {
    }
    __decorate([
        typeorm_1.Column("int", {
            nullable: false,
            primary: true,
            name: "number"
        })
    ], priority.prototype, "number");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return timetonotificate_1.timetonotificate; }, function (timetonotificate) { return timetonotificate.prioritys; }, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'time_to_notificate' })
    ], priority.prototype, "time_to_notificate");
    __decorate([
        typeorm_1.OneToMany(function (type) { return group_dispensers_1.group_dispensers; }, function (group_dispensers) { return group_dispensers.priority; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], priority.prototype, "group_dispenserss");
    __decorate([
        typeorm_1.OneToMany(function (type) { return intake_moment_1.intake_moment; }, function (intake_moment) { return intake_moment.priority_number; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], priority.prototype, "intake_moments");
    priority = __decorate([
        typeorm_1.Entity("priority", { schema: "asautar_db" }),
        typeorm_1.Index("fk_Priority_TimeToNotificate1_idx", ["time_to_notificate",])
    ], priority);
    return priority;
}());
exports.priority = priority;
