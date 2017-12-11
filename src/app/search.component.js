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
var core_2 = require("@angular/core");
var search_service_1 = require("./search.service");
var app_config_1 = require("./app.config");
var SearchComponent = (function () {
    function SearchComponent(searchService, config) {
        this.searchService = searchService;
        this.config = config;
        this.searchInput = '';
        this.selectedTerminologies = [];
        this.internalOnly = this.config.DEFAULT_SEARCH_INTERNAL_ONLY;
        this.firstMatch = this.config.DEFAULT_SEARCH_FIRST_MATCH;
        this.matchType = this.config.DEFAULT_SEARCH_MATCH_TYPE;
        this.example_term1 = this.config.SEARCH_EXAMPLE1;
        this.example_term2 = this.config.SEARCH_EXAMPLE2;
        this.example_term3 = this.config.SEARCH_EXAMPLE3;
        this.error = null; //search result error
        this.loading = false; //show search in progress loader
        this.contactUrl = this.config.ERROR_MESSAGE_URL; //contact url to display in error message
    }
    /*
    * init search component:
    * reset search default values
    * fill list of all terminologies available in TS
    * init UIs of search bar and particular terminologies for semanticUI
    */
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resetSearchDefaults();
        this.searchService.getAllTerminologies().subscribe(function (terminologies) {
            // console.log('terminologies')
            // console.log(terminologies['results']);
            _this.terminologies = terminologies['results'];
            _this.terminologies.sort(function (a, b) { return _this.sortByAcronym(a, b); });
        }, function (err) {
            console.log(err);
            _this.error = err;
        });
        $('#particularTerminologies').dropdown();
        $('#searchInput').dropdown();
    };
    /*
    * listen to keyboard-enter if widget is focused to start search
    */
    SearchComponent.prototype.keyboardInput = function (event) {
        if (!document.activeElement.className.startsWith('search')) {
            if (event.keyCode == 13) {
                this.performSearch();
                // } else {
                // 	$('#searchInput').focus();
            }
        }
    };
    /*
    * start search by delegating it to search.service
    * term and narrow options are bound to respective ui elements
    * sort result list by label
    */
    SearchComponent.prototype.performSearch = function () {
        var _this = this;
        if (this.searchInput) {
            this.loading = true;
            this.error = null;
            // console.log('narrow options:', this.matchType, this.firstMatch, this.internalOnly, this.terminologies);
            // this.searchService.performFullSearch(this.searchInput)
            // 	// .delay(1000)
            // 	.subscribe(
            // 	results => {
            // 		this.fullResults = results['results'];
            // 		console.log(this.fullResults.length + ' full result(s) for ' + this.searchInput);
            // 		// this.loading = false;
            // 	},
            // 	error => {
            // 		console.log('full search error');
            // 		console.log(error);
            // 		// this.loading = false;
            // 	},
            // 	() => {
            // 		console.log('full search completed')
            // 	}
            // 	);
            this.searchService.performSearch(this.searchInput, this.matchType, this.firstMatch, this.internalOnly, this.selectedTerminologies)
                .subscribe(function (results) {
                console.log('user request');
                console.log('query: ', results['request']['query'], "\n", 'time: ', results['request']['executionTime']);
                _this.results = results['results'];
                _this.loading = false;
                console.log(_this.results.length + ' user search result(s) for ' + _this.searchInput);
                // console.log(results['results']);
                // SORTING THE RESULT
                _this.results.sort(function (a, b) { return _this.sortResultByLabel(a, b); });
                if (results['diagnostics'].length > 0) {
                    _this.diagnostics = results['diagnostics'];
                    console.log('user diagnostics');
                    console.log(_this.diagnostics);
                }
            }, function (err) {
                console.log('user search error');
                console.log(err);
                _this.loading = false;
                _this.error = err;
            }, function () {
                console.log('user search request completed');
            });
        }
        else {
            console.log('no search term provided');
        }
    };
    /*
    * event handler for narrow-checkbox to filter search results
    */
    SearchComponent.prototype.onNarrowClick = function (event) {
        setTimeout(function () {
            // console.log(event.srcElement);
            // console.log(event.srcElement.getAttribute('ng-reflect-model'));
        }, 10);
        // this.performSearch();		
    };
    /*
    * event handler for term example to start example search
    */
    SearchComponent.prototype.onExampleClick = function (event) {
        this.searchInput = event.srcElement.getAttribute('value');
        this.resetSearchDefaults();
        this.performSearch();
    };
    /*** HELPER FUNCTIONS ***/
    /*
    * clear multiple search dropdown field particular terminolgies
    */
    SearchComponent.prototype.clearParticularTerminologies = function () {
        $('#particularTerminologies').dropdown('clear');
    };
    /*
    * reset narrow options to default values
    * default values are configured in app.config
    */
    SearchComponent.prototype.resetSearchDefaults = function () {
        this.matchType = this.config.DEFAULT_SEARCH_MATCH_TYPE;
        this.firstMatch = this.config.DEFAULT_SEARCH_FIRST_MATCH;
        this.internalOnly = this.config.DEFAULT_SEARCH_INTERNAL_ONLY;
        this.clearParticularTerminologies();
    };
    /*
    * sort terminologies by acronym
    */
    SearchComponent.prototype.sortByAcronym = function (a, b) {
        if (a.acronym < b.acronym)
            return -1;
        if (a.acronym > b.acronym)
            return 1;
        return 0;
    };
    ;
    /*
    * sort terminologies by name
    */
    SearchComponent.prototype.sortByName = function (a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    };
    ;
    /*
    * sort results by label
    */
    SearchComponent.prototype.sortResultByLabel = function (a, b) {
        // console.log('sort by label');
        if (a.label < b.label)
            return -1;
        if (a.label > b.label)
            return 1;
        return 0;
    };
    return SearchComponent;
}());
__decorate([
    core_2.HostListener('window:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], SearchComponent.prototype, "keyboardInput", null);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search-component',
        templateUrl: './search.component.html',
    }),
    __param(1, core_1.Inject(app_config_1.APP_CONFIG)),
    __metadata("design:paramtypes", [search_service_1.SearchService, Object])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map