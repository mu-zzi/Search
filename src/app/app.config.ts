import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
	DEV_SERVER: string;
	PROD_SERVER: string;
	// IS_DEV: boolean;

	SEARCH_SERVICE: string;

	SEARCH_QUERY: string;
	SEARCH_MATCH_TYPE: string;
	SEARCH_FIRST_MATCH: string;
	SEARCH_INTERNAL_ONLY: string;
	SEARCH_TERMINOLOGIES: string;

	MATCH_TYPE_EXACT: string;
	MATCH_TYPE_INCLUDED: string;

	DEFAULT_SEARCH_MATCH_TYPE: boolean;
	DEFAULT_SEARCH_FIRST_MATCH: boolean;
	DEFAULT_SEARCH_INTERNAL_ONLY: boolean;

	SEARCH_EXAMPLE1: string;
	SEARCH_EXAMPLE2: string;
	SEARCH_EXAMPLE3: string;

	ERROR_MESSAGE_URL: string;
}

export const AppConfig: IAppConfig = {    
	DEV_SERVER: 'https://dev-gfbio.bgbm.org/api/terminologies/',
	PROD_SERVER: 'https://terminologies.gfbio.org/api/terminologies/',
	// IS_DEV: false,

	SEARCH_SERVICE: 'search',

	SEARCH_QUERY: 'query',
	SEARCH_MATCH_TYPE: 'match_type',
	SEARCH_FIRST_MATCH: 'first_hit',
	SEARCH_INTERNAL_ONLY: 'internal_only',
	SEARCH_TERMINOLOGIES: 'terminologies',

	MATCH_TYPE_EXACT: 'exact',
	MATCH_TYPE_INCLUDED: 'included',

	DEFAULT_SEARCH_MATCH_TYPE: true,
	DEFAULT_SEARCH_FIRST_MATCH: false,
	DEFAULT_SEARCH_INTERNAL_ONLY: true,

	SEARCH_EXAMPLE1: 'biomass',
	SEARCH_EXAMPLE2: 'honey bee',
	SEARCH_EXAMPLE3: 'nitrate',

	ERROR_MESSAGE_URL: 'https://terminologies.gfbio.org/about/#team',
};