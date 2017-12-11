import { Component, Input, OnChanges, Inject} from '@angular/core';

import { Result } from './result';
import { MOCKRESULTS } from './mock.results';
import { APP_CONFIG, IAppConfig } from './app.config';


@Component({
	selector: 'result-list',
	templateUrl: './result-list.component.html',
})

export class ResultListComponent implements OnChanges {
	@Input()
	results: Result[];
	private resultCount: number = 0;


	constructor(
		@Inject(APP_CONFIG)
		private config: IAppConfig) { }

	ngOnChanges(): void {
		/* show mock results in dev version */
		// if (this.config.IS_DEV) {
		// 	this.results = MOCKRESULTS;
		// }

		if (this.results) {
			this.resultCount = this.results.length;
		}
	}

	/*
	* add event handler for URIs/URLs
	* workaround for event.srcElement in Firefox
	* https://stackoverflow.com/questions/1553661/how-to-get-the-onclick-calling-object
	*/
	onUriClick(e: any): void {
		e = e || window.event;
		let targ = e.target || e.srcElement;
		if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug

		let href = targ.href;

		e.preventDefault();
		console.log('open new window with url ' + href);
		window.open(href, '_blank', '', false);
	}
}
