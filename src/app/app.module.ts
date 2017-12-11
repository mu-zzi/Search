import { NgModule
	// , ElementRef
	 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search.component';
import { ResultComponent } from './result.component';
import { SearchService } from './search.service';
import { ResultListComponent } from './result-list.component';

import { APP_CONFIG, AppConfig } from './app.config';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		CommonModule,
		FormsModule
	],

	declarations: [
		AppComponent,
		SearchComponent,
		ResultComponent,
		ResultListComponent
	],

	providers: [
		SearchService,
		{ provide: APP_CONFIG, useValue: AppConfig }
	],

	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
