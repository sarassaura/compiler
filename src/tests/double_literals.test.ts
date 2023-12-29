import parser from '../parser';

test('Double Literals', () => {
	expect(parser('((')).toStrictEqual({
		type: 'program',
		body: [{ kind: '(' }, { kind: '(' }]
	});
});
