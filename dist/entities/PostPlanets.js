"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.PostPlanets = void 0;
var typeorm_1 = require("typeorm");
var FavsPlanets_1 = require("./FavsPlanets");
var PostPlanets = /** @class */ (function (_super) {
    __extends(PostPlanets, _super);
    function PostPlanets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], PostPlanets.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPlanets.prototype, "name");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPlanets.prototype, "descripcion");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPlanets.prototype, "climate");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPlanets.prototype, "population");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPlanets.prototype, "orbital_period");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPlanets.prototype, "rotation_period");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPlanets.prototype, "diameter");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPlanets.prototype, "foto");
    __decorate([
        typeorm_1.OneToMany(function () { return FavsPlanets_1.FavsPlanets; }, function (favsplanets) { return favsplanets.postplanets; }),
        __metadata("design:type", FavsPlanets_1.FavsPlanets)
    ], PostPlanets.prototype, "favsplanets");
    PostPlanets = __decorate([
        typeorm_1.Entity()
    ], PostPlanets);
    return PostPlanets;
}(typeorm_1.BaseEntity));
exports.PostPlanets = PostPlanets;
