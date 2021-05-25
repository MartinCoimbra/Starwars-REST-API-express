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
exports.PostPersons = void 0;
var typeorm_1 = require("typeorm");
var FavPerson_1 = require("./FavPerson");
var PostPersons = /** @class */ (function (_super) {
    __extends(PostPersons, _super);
    function PostPersons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], PostPersons.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPersons.prototype, "name");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPersons.prototype, "descripcion");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPersons.prototype, "birth_year");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPersons.prototype, "gender");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], PostPersons.prototype, "height");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPersons.prototype, "skin_color");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPersons.prototype, "hair_color");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostPersons.prototype, "foto");
    __decorate([
        typeorm_1.OneToMany(function () { return FavPerson_1.FavsPersons; }, function (favspersons) { return favspersons.postpersons; }),
        __metadata("design:type", FavPerson_1.FavsPersons)
    ], PostPersons.prototype, "favspersons");
    PostPersons = __decorate([
        typeorm_1.Entity()
    ], PostPersons);
    return PostPersons;
}(typeorm_1.BaseEntity));
exports.PostPersons = PostPersons;
