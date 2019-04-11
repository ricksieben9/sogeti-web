"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var medicine_1 = require("./medicine");
var medicine_types = /** @class */ (function () {
    function medicine_types() {
    }
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            primary: true,
            length: 50,
            name: "type"
        })
    ], medicine_types.prototype, "type");
    __decorate([
        typeorm_1.OneToMany(function (type) { return medicine_1.medicine; }, function (medicine) { return medicine.medicine_type; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], medicine_types.prototype, "medicines");
    medicine_types = __decorate([
        typeorm_1.Entity("medicine_types", { schema: "asautar_db" })
    ], medicine_types);
    return medicine_types;
}());
exports.medicine_types = medicine_types;
