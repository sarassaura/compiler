import parser from '../parser';

test('Joker test', () => {
	expect(
		parser(
			`const example = []\n\nexample.push('1'); "ddd"` +
				'`ss`; // awfna awenf \n /* Bla /n 2 */ await'
		)
	).toStrictEqual({
		type: 'program',
		body: [
			{ kind: 'Keyword', value: 'const', start: 0, end: 5 },
			{ kind: 'Identifier', value: 'example', start: 6, end: 13 },
			{ kind: '=', start: 14, end: 15 },
			{ kind: '[', start: 16, end: 17 },
			{ kind: ']', start: 17, end: 18 },
			{ kind: 'Identifier', value: 'example', start: 20, end: 27 },
			{ kind: '.', start: 27, end: 28 },
			{ kind: 'Identifier', value: 'push', start: 28, end: 32 },
			{ kind: '(', start: 32, end: 33 },
			{ kind: 'String', value: "'1'", start: 33, end: 36 },
			{ kind: ')', start: 36, end: 37 },
			{ kind: ';', start: 37, end: 38 },
			{ kind: 'String', value: '"ddd"', start: 39, end: 44 },
			{ kind: 'String', value: '`ss`', start: 44, end: 48 },
			{ kind: ';', start: 48, end: 49 },
			{ kind: 'Comment', value: '// awfna awenf ', start: 50, end: 65 },
			{ kind: 'CommentMultiline', value: '/* Bla /n 2 */', start: 67, end: 81 },
			{ kind: 'Keyword', value: 'await', start: 82, end: 87 }
		]
	});
});
