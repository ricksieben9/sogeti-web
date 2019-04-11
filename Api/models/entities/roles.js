"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var roles = /** @class */ (function () {
    function roles() {
    }
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            primary: true,
            length: 25,
            name: "role"
        })
    ], roles.prototype, "role");
    __decorate([
        typeorm_1.OneToMany(function (type) { return user_1.user; }, function (user) { return user.roles_role; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], roles.prototype, "users");
    roles = __decorate([
        typeorm_1.Entity("roles", { schema: "asautar_db" })
    ], roles);
    return roles;
}());
exports.roles = roles;
