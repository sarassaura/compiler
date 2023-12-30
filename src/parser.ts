import lexer from './lexer';

export default function parser(str: string): AST {
	const Tokens = lexer(str);

	Tokens.forEach((token) => {
		if (token.kind == 'INVALID') {
			console.log('Invalid Character: ', token.value);
		}
	});

	return {
		type: 'program',
		body: Tokens
	};
}
