"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var intake_moment_1 = require("./intake_moment");
var medicine_1 = require("./medicine");
var intake_moment_medicines = /** @class */ (function () {
    function intake_moment_medicines() {
    }
    __decorate([
        typeorm_1.ManyToOne(function (type) { return intake_moment_1.intake_moment; }, function (intake_moment) { return intake_moment.intake_moment_mediciness; }, { primary: true, nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'intake_moment_id' })
    ], intake_moment_medicines.prototype, "intake_moment_");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return medicine_1.medicine; }, function (medicine) { return medicine.intake_moment_mediciness; }, { primary: true, nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'medicine_id' })
    ], intake_moment_medicines.prototype, "medicine_");
    __decorate([
        typeorm_1.Column("int", {
            nullable: false,
            name: "time_window"
        })
    ], intake_moment_medicines.prototype, "time_window");
    __decorate([
        typeorm_1.Column("datetime", {
            nullable: true,
            name: "completed at"
        })
    ], intake_moment_medicines.prototype, "completed");
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            length: 45,
            name: "dosage"
        })
    ], intake_moment_medicines.prototype, "dosage");
    intake_moment_medicines = __decorate([
        typeorm_1.Entity("intake_moment_medicines", { schema: "asautar_db" }),
        typeorm_1.Index("fk_Intake_moment_has_Medicine_Medicine1_idx", ["medicine_",]),
        typeorm_1.Index("fk_Intake_moment_has_Medicine_Intake_moment1_idx", ["intake_moment_",])
    ], intake_moment_medicines);
    return intake_moment_medicines;
}());
exports.intake_moment_medicines = intake_moment_medicines;
