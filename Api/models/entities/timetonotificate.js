"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var priority_1 = require("./priority");
var timetonotificate = /** @class */ (function () {
    function timetonotificate() {
    }
    __decorate([
        typeorm_1.Column("time", {
            nullable: false,
            primary: true,
            name: "time"
        })
    ], timetonotificate.prototype, "time");
    __decorate([
        typeorm_1.OneToMany(function (type) { return priority_1.priority; }, function (priority) { return priority.time_to_notificate; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    ], timetonotificate.prototype, "prioritys");
    timetonotificate = __decorate([
        typeorm_1.Entity("timetonotificate", { schema: "asautar_db" })
    ], timetonotificate);
    return timetonotificate;
}());
exports.timetonotificate = timetonotificate;
