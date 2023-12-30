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
			body: [{ kind: 'Identifier', value: '_' }]
		});

		expect(parser('_ab23c')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'Identifier', value: '_ab23c' }]
		});

		expect(parser('const')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'Keyword', value: 'const' }]
		});
	});
	test('Numbers', () => {
		expect(parser('1')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'NumericLiteral', value: '1' }]
		});

		expect(parser('123')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'NumericLiteral', value: '123' }]
		});
	});
	test('Comments', () => {
		expect(parser('// So Cool')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'Comment', value: '// So Cool' }]
		});

		expect(parser('/* So Cool \n */')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'CommentMultiline', value: '/* So Cool \n */' }]
		});
	});
	test('Strings', () => {
		expect(parser('""')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'String', value: '""' }]
		});

		expect(parser('"')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'String', value: '"' }]
		});

		expect(parser('"B"')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'String', value: '"B"' }]
		});

		expect(parser('`B`')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'String', value: '`B`' }]
		});

		expect(parser("'B'")).toStrictEqual({
			type: 'program',
			body: [{ kind: 'String', value: "'B'" }]
		});
	});
	test('TokenLiterals', () => {
		expect(parser('=')).toStrictEqual({
			type: 'program',
			body: [{ kind: '=' }]
		});
	});
	test('Double Literals', () => {
		expect(parser('((')).toStrictEqual({
			type: 'program',
			body: [{ kind: '(' }, { kind: '(' }]
		});
	});
	test('Invalid Token', () => {
		expect(parser('@')).toStrictEqual({
			type: 'program',
			body: [{ kind: 'INVALID', value: '@' }]
		});
	});
});
