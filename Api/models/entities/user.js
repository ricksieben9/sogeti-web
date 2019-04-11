"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var roles_1 = require("./roles");
var group_dispensers_1 = require("./group_dispensers");
var intake_moment_1 = require("./intake_moment");
var log_1 = require("./log");
var user = /** @class */ (function () {
    function user() {
    }
    __decorate([
        typeorm_1.ManyToOne(function (type) { return roles_1.roles; }, function (roles) { return roles.users; }, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'roles_role' })
    ], user.prototype, "roles_role");
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "int",
            name: "id"
        })
    ], user.prototype, "id");
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            unique: true,
            length: 100,
            name: "email"
        })
    ], user.prototype, "email");
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            length: 100,
            name: "password"
        })
    ], user.prototype, "password");
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            length: 45,
            name: "name"
        })
    ], user.prototype, "name");
    __decorate([
        typeorm_1.OneToMany(function (type) { return group_dispensers_1.group_dispensers; }, function (group_dispensers) { return group_dispensers.user_; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], user.prototype, "group_dispenserss");
    __decorate([
        typeorm_1.OneToMany(function (type) { return intake_moment_1.intake_moment; }, function (intake_moment) { return intake_moment.dispenser; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], user.prototype, "intake_moments");
    __decorate([
        typeorm_1.OneToMany(function (type) { return log_1.log; }, function (log) { return log.user_; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], user.prototype, "logs");
    user = __decorate([
        typeorm_1.Entity("user", { schema: "asautar_db" }),
        typeorm_1.Index("email_UNIQUE", ["email",], { unique: true }),
        typeorm_1.Index("fk_Person_Roles_idx", ["roles_role",])
    ], user);
    return user;
}());
exports.user = user;
