"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Tab2Page = void 0;
var core_1 = require("@angular/core");
var Tab2Page = /** @class */ (function () {
    function Tab2Page(storage, navCtrl) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.tickets = [];
    }
    Tab2Page.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('tickets').then(function (val) { return val == null || val == undefined ? _this.tickets : _this.tickets = _this.fillArray(val, val.cantidad); });
        if (this.tickets.length == 0) {
            this.message = "No hay Tickets comprados todavia";
        }
    };
    Tab2Page.prototype.fillArray = function (value, len) {
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(value);
        }
        return arr;
    };
    Tab2Page.prototype.goToCancelar = function () {
        this.navCtrl.navigateRoot('cancelar-orden');
    };
    Tab2Page = __decorate([
        core_1.Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        })
    ], Tab2Page);
    return Tab2Page;
}());
exports.Tab2Page = Tab2Page;
