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
    function CancelarOrdenPage(storage, navCtrl, firedatabase, fireauth) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.firedatabase = firedatabase;
        this.fireauth = fireauth;
        this.data = [];
    }
    CancelarOrdenPage.prototype.ngOnInit = function () {
        var _this = this;
        this.fireauth.currentUser.then(function (user) {
            if (user) {
                _this.uid = user.uid;
                _this.firedatabase.database.ref('users/' + user.uid)
                    .on('value', function (val) {
                    console.log(val.val());
                    if (val.exists()) {
                        _this.data = val.val().orden.filter(function (x) { return x.bought == true; });
                        _this.data.push({
                            pedido: val.val().ticket,
                            cantidad: val.val().ticket.cantidad,
                            bought: val.val().ticket.bought,
                            paymentType: val.val().ticket.paymentType
                        });
                        _this.cantidad = val.val().ticket.cantidad;
                        _this.total = _this.data.map(function (x) { return x.pedido.price * x.cantidad; }).reduce(function (a, b) { return a + b; });
                    }
                });
            }
        });
    };
    CancelarOrdenPage.prototype.cancelarTickets = function () {
        this.firedatabase.database.ref('users/' + this.uid).child('ticket').set({});
        this.firedatabase.database.ref('users/' + this.uid).child('orden').set([]);
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
