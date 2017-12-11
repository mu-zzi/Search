"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.APP_CONFIG = new core_1.OpaqueToken("app.config");
exports.AppConfig = {
    DEV_SERVER: 'http://dev-gfbio.bgbm.org/api/terminologies/',
    PROD_SERVER: 'https://terminologies.gfbio.org/api/terminologies/',
    IS_DEV: false,
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
//# sourceMappingURL=app.config.js.map