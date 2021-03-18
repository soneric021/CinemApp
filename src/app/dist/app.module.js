"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var modal_page_page_1 = require("./modal-page/modal-page.page");
var auth_1 = require("@angular/fire/auth");
var fire_1 = require("@angular/fire");
var database_1 = require("@angular/fire/database");
var environment_1 = require("src/environments/environment");
var storage_1 = require("@ionic/storage");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, modal_page_page_1.ModalPagePage],
            entryComponents: [modal_page_page_1.ModalPagePage],
            imports: [platform_browser_1.BrowserModule, angular_1.IonicModule.forRoot(), app_routing_module_1.AppRoutingModule, fire_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                auth_1.AngularFireAuthModule, database_1.AngularFireDatabaseModule, storage_1.IonicStorageModule.forRoot({
                    name: 'cinemappdb',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                })],
            providers: [{ provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
