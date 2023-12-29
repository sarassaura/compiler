///<reference path="./index.d.ts" />

import parser from './parser';

console.log(
	parser(
		`const example = []\n\nexample.push('1'); "ddd"` +
			'`ss`; // awfna awenf \n /* Bla /n 2 */ await'
	)
);
