"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var app_config_1 = require("./app.config");
var SearchService = (function () {
    function SearchService(http, config) {
        this.http = http;
        this.config = config;
        this.results = []; //search results
        this.baseUrl = this.config.IS_DEV ? this.config.DEV_SERVER : this.config.PROD_SERVER;
    }
    /*
    * start user search
    * term and narrow options are bound to respective ui elements
    */
    SearchService.prototype.performSearch = function (term, exactSearch, firstMatch, internalOnly, terminologies) {
        var params = new http_1.URLSearchParams();
        var matchType = exactSearch ? this.config.MATCH_TYPE_EXACT : this.config.MATCH_TYPE_INCLUDED;
        var particularTerminologies = '';
        params.set(this.config.SEARCH_QUERY, term);
        params.set(this.config.SEARCH_MATCH_TYPE, matchType);
        params.set(this.config.SEARCH_FIRST_MATCH, firstMatch + '');
        params.set(this.config.SEARCH_INTERNAL_ONLY, internalOnly + '');
        if (terminologies.length > 0) {
            for (var t in terminologies) {
                var delimiter = ',';
                if (t == '0') {
                    delimiter = '';
                }
                particularTerminologies = particularTerminologies + delimiter + terminologies[t].toUpperCase();
            }
            params.set(this.config.SEARCH_TERMINOLOGIES, particularTerminologies);
        }
        return this.http.get(this.baseUrl + this.config.SEARCH_SERVICE, { search: params })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error performing the search'); });
    };
    /*
    * start full search
    * narrow options are disabled
    */
    SearchService.prototype.performFullSearch = function (term) {
        return this.performSearch(term, false, false, false, []);
    };
    /*
    * get all terminologies available in TS
    */
    SearchService.prototype.getAllTerminologies = function () {
        var d = Date.now().valueOf();
        return this.http.get(this.baseUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error getting all terminologies'); })
            .finally(function () { console.log('finished: ' + (Date.now().valueOf() - d)); });
    };
    return SearchService;
}());
SearchService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject(app_config_1.APP_CONFIG)),
    __metadata("design:paramtypes", [http_1.Http, Object])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map