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
var group_1 = require("./group");
var receiver = /** @class */ (function () {
    function receiver() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "int",
            name: "id"
        })
    ], receiver.prototype, "id");
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            length: 45,
            name: "name"
        })
    ], receiver.prototype, "name");
    __decorate([
        typeorm_1.OneToMany(function (type) { return intake_moment_1.intake_moment; }, function (intake_moment) { return intake_moment.receiver_; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], receiver.prototype, "intake_moments");
    __decorate([
        typeorm_1.ManyToMany(function (type) { return group_1.group; }, function (group) { return group.receivers; })
    ], receiver.prototype, "groups");
    receiver = __decorate([
        typeorm_1.Entity("receiver", { schema: "asautar_db" })
    ], receiver);
    return receiver;
}());
exports.receiver = receiver;
