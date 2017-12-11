import { Component, OnInit, Inject, AfterViewChecked
	// , ElementRef
} from '@angular/core';

import { HostListener } from '@angular/core';

import { SearchService } from './search.service';
import { Result } from './result';
import { ResultListComponent } from './result-list.component'; 
import { Terminology } from './terminology';

import { APP_CONFIG, IAppConfig } from './app.config';

@Component({
	selector: 'search-component',
	templateUrl: './search.component.html',
})

export class SearchComponent implements OnInit, AfterViewChecked {
	private searchInput: string = '';
	private selectedTerminologies: string[] = [];
	private internalOnly: boolean = this.config.DEFAULT_SEARCH_INTERNAL_ONLY;
	private firstMatch: boolean = this.config.DEFAULT_SEARCH_FIRST_MATCH;
	private matchType: boolean = this.config.DEFAULT_SEARCH_MATCH_TYPE;

	private example_term1: string = this.config.SEARCH_EXAMPLE1;
	private example_term2: string = this.config.SEARCH_EXAMPLE2;
	private example_term3: string = this.config.SEARCH_EXAMPLE3;

	private results: Result[]; //results from user search with bound narrowing options
	private fullResults: Result[]; //results from full search without any narrowing option
	private diagnostics: any; //search result diagnostics
	private error: any = null; //search result error
	private loading: boolean = false; //search in progress loader
	private loadingTerminologies: boolean = false; //loading terminology names
	private completed: boolean = false;

	private contactUrl: string = this.config.ERROR_MESSAGE_URL;  //contact url to display in error message

	private terminologies: Terminology[]; //all terminologies available in TS

	constructor(
		private searchService: SearchService,
		// private elemRef: ElementRef,

		@Inject(APP_CONFIG)
		private config: IAppConfig) { }

	/*
	* init search component:
	* reset search default values
	* fill list of all terminologies available in TS
	* init UIs of search bar and particular terminologies for semanticUI
	*/
	ngOnInit(): void{
		this.resetSearchDefaults();

		this.loadingTerminologies = true;
		this.searchService.getAllTerminologies().subscribe(
			terminologies => {
				this.terminologies = terminologies['results'];
				this.terminologies.sort((a: Terminology, b: Terminology) => this.sortByAcronym(a, b));
				this.loadingTerminologies = false;
			},
			err => {
				console.log(err);
				this.error = err;
				this.loadingTerminologies = false;
			});

		$('#particularTerminologies').dropdown();
		$('#searchInput').dropdown();

		var ptDropdown = document.getElementById('ptDropdown');
		ptDropdown.addEventListener('click', function() {
			window.dispatchEvent(new Event('resize'));
		});
	}

	ngAfterViewChecked(): void {
		if (this.completed){
			window.dispatchEvent(new Event('resize'));
			this.completed = false;
		}
	}

	/* 
	* listen to keyboard-enter if widget is focused to start search
	*/
	@HostListener('window:keydown', ['$event'])
	keyboardInput(event: KeyboardEvent) {
		if (!document.activeElement.className.startsWith('search')) {
			if (event.keyCode == 13) {
				this.performSearch();
			// } else {
			// 	$('#searchInput').focus();
			}
		}
	}

	/*
	* start search by delegating it to search.service
	* term and narrow options are bound to respective ui elements
	* sort result list by label
	*/
	performSearch(): void {
		if (this.searchInput) {
			this.loading = true;
			this.error = null;

			this.searchService.performSearch(this.searchInput, this.matchType, this.firstMatch, this.internalOnly, this.selectedTerminologies)
				.subscribe(
				results => {
					// console.log('query: ', results['request']['query']);
					// console.log('execTime: ', results['request']['executionTime']);

					this.results = results['results'];
					this.loading = false;

					console.log(this.results.length + ' user search result(s) for ' + this.searchInput);

					// SORTING THE RESULT
					this.results.sort((a, b) => this.sortResultByLabel(a, b));

					if (results['diagnostics'].length > 0) {
						this.diagnostics = results['diagnostics'];
						console.log('user diagnostics');
						console.log(this.diagnostics);
					}
				},
				err => {
					console.log('user search error');
					console.log(err);
					this.loading = false;
					this.error = err;
				},
				() => {
					this.completed = true;
				}
			);
		}else{
			console.log('no search term provided');
		}
	}

	/*
	* event handler for term example to start example search
	* workaround for event.srcElement in Firefox 
	* https://stackoverflow.com/questions/1553661/how-to-get-the-onclick-calling-object
	*/
	onExampleClick(e: any): void {
		e = e || window.event;
		let targ = e.target || e.srcElement;
		if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug

		this.searchInput = targ.value;
		this.resetSearchDefaults();
		this.performSearch();	
	}

	/*** HELPER FUNCTIONS ***/

	/*
	* clear multiple search dropdown field particular terminolgies
	*/
	clearParticularTerminologies(): void {
		$('#particularTerminologies').dropdown('clear');
	}

	/*
	* reset narrow options to default values and clear particular terminologies field
	* default values are configured in app.config
	*/
	resetSearchDefaults(): void{
		this.matchType = this.config.DEFAULT_SEARCH_MATCH_TYPE;
		this.firstMatch = this.config.DEFAULT_SEARCH_FIRST_MATCH;
		this.internalOnly = this.config.DEFAULT_SEARCH_INTERNAL_ONLY;
		this.clearParticularTerminologies();
	}

	/*
	* sort terminologies by acronym
	*/
	sortByAcronym(a: Terminology, b: Terminology) {
		if (a.acronym < b.acronym) return -1;
		if (a.acronym > b.acronym) return 1;
		return 0;
	};

	/*
	* sort terminologies by name
	*/
	sortByName(a: Terminology, b: Terminology) {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	};

	/*
	* sort results by label
	*/
	sortResultByLabel(a: Result, b: Result) {
		// console.log('sort by label');
		if (a.label < b.label) return -1;
		if (a.label > b.label) return 1;
		return 0;
	}
}