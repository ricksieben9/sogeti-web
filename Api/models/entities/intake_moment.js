"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var receiver_1 = require("./receiver");
var priority_1 = require("./priority");
var user_1 = require("./user");
var intake_moment_medicines_1 = require("./intake_moment_medicines");
var intake_moment = /** @class */ (function () {
    function intake_moment() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "int",
            name: "id"
        })
    ], intake_moment.prototype, "id");
    __decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "intake_start_time"
        })
    ], intake_moment.prototype, "intake_start_time");
    __decorate([
        typeorm_1.Column("datetime", {
            nullable: false,
            name: "intake_end_time"
        })
    ], intake_moment.prototype, "intake_end_time");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return receiver_1.receiver; }, function (receiver) { return receiver.intake_moments; }, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'receiver_id' })
    ], intake_moment.prototype, "receiver_");
    __decorate([
        typeorm_1.Column("longtext", {
            nullable: true,
            name: "remark"
        })
    ], intake_moment.prototype, "remark");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return priority_1.priority; }, function (priority) { return priority.intake_moments; }, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'priority_number' })
    ], intake_moment.prototype, "priority_number");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_1.user; }, function (user) { return user.intake_moments; }, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'dispenser' })
    ], intake_moment.prototype, "dispenser");
    __decorate([
        typeorm_1.OneToMany(function (type) { return intake_moment_medicines_1.intake_moment_medicines; }, function (intake_moment_medicines) { return intake_moment_medicines.intake_moment_; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], intake_moment.prototype, "intake_moment_mediciness");
    intake_moment = __decorate([
        typeorm_1.Entity("intake_moment", { schema: "asautar_db" }),
        typeorm_1.Index("fk_intake_moment_Receiver1_idx", ["receiver_",]),
        typeorm_1.Index("fk_Intake_moment_Priority1_idx", ["priority_number",]),
        typeorm_1.Index("fk_Intake_moment_User1_idx", ["dispenser",])
    ], intake_moment);
    return intake_moment;
}());
exports.intake_moment = intake_moment;
