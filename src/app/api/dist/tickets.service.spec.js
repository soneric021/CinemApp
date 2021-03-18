"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var tickets_service_1 = require("./tickets.service");
describe('TicketsService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(tickets_service_1.TicketsService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
