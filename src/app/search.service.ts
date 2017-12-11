import { Injectable, Inject
	// , ElementRef 
} from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Result } from './result';
import { Terminology } from './terminology';

import { APP_CONFIG, IAppConfig } from './app.config';

import { IS_DEV } from '../main';

@Injectable()
export class SearchService{
	private results: Result[] = []; //search results
	private baseUrl: string = IS_DEV ? this.config.DEV_SERVER : this.config.PROD_SERVER;

	constructor(
		private http: Http,
		// private elemRef: ElementRef,
		
		@Inject(APP_CONFIG)
		private config: IAppConfig) { }

	/*
	* start user search
	* term and narrow options are bound to respective ui elements
	*/
	performSearch(term: string, exactSearch: boolean, firstMatch: boolean, internalOnly: boolean, terminologies: string[]): Observable<Result[]> {
		let params: URLSearchParams = new URLSearchParams();
		let matchType: string = exactSearch ? this.config.MATCH_TYPE_EXACT : this.config.MATCH_TYPE_INCLUDED;
		let particularTerminologies: string = '';
		
		params.set(this.config.SEARCH_QUERY, term);
		params.set(this.config.SEARCH_MATCH_TYPE, matchType);
		params.set(this.config.SEARCH_FIRST_MATCH, firstMatch + '');
		params.set(this.config.SEARCH_INTERNAL_ONLY, internalOnly + '');

		if (terminologies.length > 0) {
			for(let t in terminologies){
				let delimiter = ',';
				if(t == '0'){
					delimiter = '';
				}

				particularTerminologies = particularTerminologies + delimiter + terminologies[t].toUpperCase();
			}
			params.set(this.config.SEARCH_TERMINOLOGIES, particularTerminologies);
		}

		return this.http.get(this.baseUrl + this.config.SEARCH_SERVICE, { search: params })
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error performing the search'))
			;
	}

	/*
	* start full search
	* narrow options are disabled
	*/
	performFullSearch(term: string): Observable<Result[]>{
		return this.performSearch(term, false, false, false, []);
	}

	/*
	* get all terminology names available in TS
	*/
	getAllTerminologies(): Observable<Terminology[]> {
		// let d: number = Date.now().valueOf();
		 return this.http.get(this.baseUrl)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error getting all terminology names'))
			// .finally(() => {console.log('finished loading terminology names: ' + (Date.now().valueOf() - d))} )
			;
	}
}