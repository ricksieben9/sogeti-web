"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var group_dispensers_1 = require("./group_dispensers");
var receiver_1 = require("./receiver");
var group = /** @class */ (function () {
    function group() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "int",
            name: "id"
        })
    ], group.prototype, "id");
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            length: 50,
            name: "name"
        })
    ], group.prototype, "name");
    __decorate([
        typeorm_1.OneToMany(function (type) { return group_dispensers_1.group_dispensers; }, function (group_dispensers) { return group_dispensers.groups_; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], group.prototype, "group_dispenserss");
    __decorate([
        typeorm_1.ManyToMany(function (type) { return receiver_1.receiver; }, function (receiver) { return receiver.groups; }, { nullable: false }),
        typeorm_1.JoinTable({ name: 'group_receiver' })
    ], group.prototype, "receivers");
    group = __decorate([
        typeorm_1.Entity("group", { schema: "asautar_db" })
    ], group);
    return group;
}());
exports.group = group;
