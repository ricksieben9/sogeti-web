"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var medicine_types_1 = require("./medicine_types");
var intake_moment_medicines_1 = require("./intake_moment_medicines");
var medicine = /** @class */ (function () {
    function medicine() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "int",
            name: "id"
        })
    ], medicine.prototype, "id");
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            length: 100,
            name: "name"
        })
    ], medicine.prototype, "name");
    __decorate([
        typeorm_1.Column("longtext", {
            nullable: false,
            name: "description"
        })
    ], medicine.prototype, "description");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return medicine_types_1.medicine_types; }, function (medicine_types) { return medicine_types.medicines; }, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'medicine_type' })
    ], medicine.prototype, "medicine_type");
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            length: 45,
            name: "unit"
        })
    ], medicine.prototype, "unit");
    __decorate([
        typeorm_1.OneToMany(function (type) { return intake_moment_medicines_1.intake_moment_medicines; }, function (intake_moment_medicines) { return intake_moment_medicines.medicine_; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], medicine.prototype, "intake_moment_mediciness");
    medicine = __decorate([
        typeorm_1.Entity("medicine", { schema: "asautar_db" }),
        typeorm_1.Index("fk_Medicine_Medicine_types1_idx", ["medicine_type",])
    ], medicine);
    return medicine;
}());
exports.medicine = medicine;
