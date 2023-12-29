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
			{ kind: 'Keyword', value: 'const' },
			{ kind: 'Identifier', value: 'example' },
			{ kind: '=' },
			{ kind: '[' },
			{ kind: ']' },
			{ kind: 'Identifier', value: 'example' },
			{ kind: '.' },
			{ kind: 'Identifier', value: 'push' },
			{ kind: '(' },
			{ kind: 'String', value: "'1'" },
			{ kind: ')' },
			{ kind: ';' },
			{ kind: 'String', value: '"ddd"' },
			{ kind: 'String', value: '`ss`' },
			{ kind: ';' },
			{ kind: 'Comment', value: '// awfna awenf ' },
			{ kind: 'CommentMultiline', value: '/* Bla /n 2 */' },
			{ kind: 'Keyword', value: 'await' }
		]
	});
});
