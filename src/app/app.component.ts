import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'gfbio-ts-search-widget',
  template: `
  <search-component></search-component>
  `,
})

export class AppComponent implements OnInit {
	ngOnInit(): void{
		console.log('starting the terminology service search widget');

		window.addEventListener("resize", function() {
			let elem: Element = document.getElementById('searchWidget');
			let newHeight: number = elem.clientHeight + 50;

			// console.log('resize', 'post message to parent', 'new size: ' + newHeight + 'px')
			window.parent.postMessage(newHeight + 'px', '*');
		});

		window.dispatchEvent(new Event("resize"));
	}
}
