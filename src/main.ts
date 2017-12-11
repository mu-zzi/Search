import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

import './styles.css';

export let IS_DEV: boolean = false;

// Enable production mode
if (process.env.ENV === 'production') {
	enableProdMode();
}else{
	IS_DEV = true;
}

platformBrowserDynamic().bootstrapModule(AppModule);
