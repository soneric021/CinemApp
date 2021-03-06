"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ConfirmarOrdenPagePage = void 0;
var core_1 = require("@angular/core");
var ConfirmarOrdenPagePage = /** @class */ (function () {
    function ConfirmarOrdenPagePage(navCtrl, fireauth, userService, toastController, firedatabase) {
        this.navCtrl = navCtrl;
        this.fireauth = fireauth;
        this.userService = userService;
        this.toastController = toastController;
        this.firedatabase = firedatabase;
        this.data = [];
        this.pedido = [];
        this.ticketOrden = null;
        this.ticket = null;
        this.isLogged = false;
    }
    ConfirmarOrdenPagePage.prototype.ngOnInit = function () {
        var _this = this;
        this.firedatabase.database.ref('orden').on('value', function (data) {
            if (!data.exists()) {
                _this.data = [];
            }
            else {
                _this.pedido = data.val();
                _this.data = _this.pedido.filter(function (x) { return x.bought == false; });
                _this.total = _this.data.map(function (x) { return x.pedido.price * x.cantidad; }).reduce(function (a, b) { return a + b; });
            }
        });
        this.firedatabase.database.ref('ticket').on('value', function (data) {
            if (data.exists()) {
                if (_this.ticketOrden != null) {
                    _this.data.pop();
                }
                _this.ticket = data.val();
                _this.ticketOrden = {
                    pedido: data.val(),
                    cantidad: data.val().cantidad,
                    bought: data.val().bought,
                    paymentType: data.val().paymentType
                };
                _this.cantidad = data.val().cantidad;
                _this.data.push(_this.ticketOrden);
                _this.total = _this.data.map(function (x) { return x.pedido.price * x.cantidad; }).reduce(function (a, b) { return a + b; });
            }
        });
        this.fireauth.currentUser.then(function (data) {
            console.log(data);
            if (data) {
                _this.uid = data.uid;
                _this.isLogged = true;
                _this.buttonmessage = !_this.isLogged ? "Accede para confirmar tu orden" : "Realizar pago";
            }
        })["catch"](function (error) { return console.log(error); });
        this.buttonmessage = !this.isLogged ? "Accede para confirmar tu orden" : "Realizar pago";
    };
    ConfirmarOrdenPagePage.prototype.goToLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.isLogged) {
                    this.navCtrl.navigateRoot('login');
                }
                else {
                    if (this.cantidad == undefined) {
                        this.presentToast("Debes elegir la cantidad de tickets que quieres");
                    }
                    else if (this.paymentType == undefined) {
                        this.presentToast("Debes elegir un metodo de pago");
                    }
                    else {
                        this.ticket.bought = true;
                        this.pedido.map(function (x) { return x.bought = true; });
                        this.firedatabase.database.ref('ticket').set({});
                        this.firedatabase.database.ref('orden').set([]);
                        this.firedatabase.database.ref('users/' + this.uid).child('ticket').set(this.ticket);
                        this.firedatabase.database.ref('users/' + this.uid).child('orden').set(this.pedido);
                        this.navCtrl.navigateRoot('tabs/tab2');
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ConfirmarOrdenPagePage.prototype.showSelectValue = function (mySelect) {
        this.cantidad = mySelect;
        this.ticket = {
            id: 1,
            displayName: 'Avengers End-Game',
            name: 'Tickets para Avengers End-Game',
            price: 500,
            time: '4:00 P.M. - 7:00 P.M.',
            cantidad: this.cantidad,
            bought: false
        };
        this.firedatabase.database.ref('ticket').set(this.ticket);
        this.ticket = null;
        this.total = this.data.map(function (x) { return x.pedido.price * x.cantidad; }).reduce(function (a, b) { return a + b; });
    };
    ConfirmarOrdenPagePage.prototype.showSelectValue2 = function (mySelect2) {
        console.log(mySelect2);
        this.paymentType = mySelect2;
    };
    ConfirmarOrdenPagePage.prototype.presentToast = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConfirmarOrdenPagePage = __decorate([
        core_1.Component({
            selector: 'app-confirmar-orden-page',
            templateUrl: './confirmar-orden-page.page.html',
            styleUrls: ['./confirmar-orden-page.page.scss']
        })
    ], ConfirmarOrdenPagePage);
    return ConfirmarOrdenPagePage;
}());
exports.ConfirmarOrdenPagePage = ConfirmarOrdenPagePage;
