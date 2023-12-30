import parser from '../parser';

describe('Lexer Basic', () => {
	test('WhiteSpaces and Newlines', () => {
		expect(parser('    ')).toStrictEqual({
			type: 'program',
			body: []
		});

		expect(parser('\n \r\n \u2028 \u2029')).toStrictEqual({
			type: 'program',
			body: []
		});
	});
	test('Identifiers and Keywords', () => {
		expect(parser('_')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'Identifier', value: '_', start: 0, end: 1 }]
		});

		expect(parser('_ab23c')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'Identifier', value: '_ab23c', start: 0, end: 6 }]
		});

		expect(parser('const')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'Keyword', value: 'const', start: 0, end: 5 }]
		});
	});
	test('Numbers', () => {
		expect(parser('1')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'NumericLiteral', value: '1', start: 0, end: 1 }]
		});

		expect(parser('123')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'NumericLiteral', value: '123', start: 0, end: 3 }]
		});
	});
	test('Comments', () => {
		expect(parser('// So Cool')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'Comment', value: '// So Cool', start: 0, end: 10 }]
		});

		expect(parser('/* So Cool \n */')).toStrictEqual({
			type: 'program',
			body: [
				{
					kind: 'CommentMultiline',
					value: '/* So Cool \n */',
					start: 0,
					end: 15
				}
			]
		});
	});
	test('Strings', () => {
		expect(parser('""')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'String', value: '""', start: 0, end: 2 }]
		});

		// expect(parser('"')).toStrictEqual({
		// 	type: 'program',
		// 	body: [{ kind: 'String', value: '"', start: 0, end: 1 }]
		// });

		expect(parser('"B"')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'String', value: '"B"', start: 0, end: 3 }]
		});

		expect(parser('`B`')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'String', value: '`B`', start: 0, end: 3 }]
		});

		expect(parser("'B'")).toStrictEqual({
			type: 'program',
			body: [{ kind: 'String', value: "'B'", start: 0, end: 3 }]
		});
	});
	test('TokenLiterals', () => {
		expect(parser('=')).toStrictEqual({
			type: 'program',
			body: [{ kind: '=', start: 0, end: 1 }]
		});
	});
	test('Double Literals', () => {
		expect(parser('((')).toStrictEqual({
			type: 'program',
			body: [
				{ kind: '(', start: 0, end: 1 },
				{ kind: '(', start: 1, end: 2 }
			]
		});
	});
	test('Invalid Token', () => {
		expect(parser('@')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'INVALID', value: '@', start: 0, end: 1 }]
		});
	});
});
