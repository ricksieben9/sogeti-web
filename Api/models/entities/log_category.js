"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var log_1 = require("./log");
var log_category = /** @class */ (function () {
    function log_category() {
    }
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            primary: true,
            length: 45,
            name: "name"
        })
    ], log_category.prototype, "name");
    __decorate([
        typeorm_1.OneToMany(function (type) { return log_1.log; }, function (log) { return log.category; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], log_category.prototype, "logs");
    log_category = __decorate([
        typeorm_1.Entity("log_category", { schema: "asautar_db" })
    ], log_category);
    return log_category;
}());
exports.log_category = log_category;
