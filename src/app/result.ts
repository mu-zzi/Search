export class Result {
	label: string;
	uri: string; //old API: term url, new API: lsid
	url: string; //new
	description: string;
	sourceTerminology: string;

	synonyms: string[];
	commonNames: string[];
	rank: string;
	externalID: string;
	kingdom: string;
	status: string;
	embeddedDatabase: string;
}