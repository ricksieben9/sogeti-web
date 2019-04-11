"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var log_category_1 = require("./log_category");
var user_1 = require("./user");
var log = /** @class */ (function () {
    function log() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "int",
            name: "id"
        })
    ], log.prototype, "id");
    __decorate([
        typeorm_1.Column("longtext", {
            nullable: false,
            name: "message"
        })
    ], log.prototype, "message");
    __decorate([
        typeorm_1.Column("datetime", {
            nullable: true,
            name: "datetime"
        })
    ], log.prototype, "datetime");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return log_category_1.log_category; }, function (log_category) { return log_category.logs; }, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'category' })
    ], log.prototype, "category");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_1.user; }, function (user) { return user.logs; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn({ name: 'user_id' })
    ], log.prototype, "user_");
    log = __decorate([
        typeorm_1.Entity("log", { schema: "asautar_db" }),
        typeorm_1.Index("fk_Log_Log_category1_idx", ["category",]),
        typeorm_1.Index("fk_Log_User1_idx", ["user_",])
    ], log);
    return log;
}());
exports.log = log;
