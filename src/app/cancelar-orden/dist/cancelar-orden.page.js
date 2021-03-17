"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CancelarOrdenPage = void 0;
var core_1 = require("@angular/core");
var CancelarOrdenPage = /** @class */ (function () {
    function CancelarOrdenPage(storage, navCtrl) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.data = [];
    }
    CancelarOrdenPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('pedido').then(function (val) { return _this.data = val; });
        this.storage.get('tickets').then(function (val) {
            _this.data.push({
                pedido: val,
                cantidad: val.cantidad
            });
            _this.cantidad = val.cantidad;
            _this.total = _this.data.map(function (x) { return x.pedido.price * x.cantidad; }).reduce(function (a, b) { return a + b; });
        });
    };
    CancelarOrdenPage.prototype.cancelarTickets = function () {
        this.storage.set('pedido', []);
        this.storage.set('tickets', {});
        this.navCtrl.navigateBack('tabs/tab2');
    };
    CancelarOrdenPage = __decorate([
        core_1.Component({
            selector: 'app-cancelar-orden',
            templateUrl: './cancelar-orden.page.html',
            styleUrls: ['./cancelar-orden.page.scss']
        })
    ], CancelarOrdenPage);
    return CancelarOrdenPage;
}());
exports.CancelarOrdenPage = CancelarOrdenPage;
