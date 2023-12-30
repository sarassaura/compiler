import lexer from './lexer';
import { keywords } from './types';

export default function parser(str: string): AST {
	const Tokens = lexer(str);

	Tokens.forEach((token) => {
		if (token.kind == 'INVALID') {
			console.log('Invalid Character: ', token.value);
		}
		if (token.kind == 'Identifier') {
			if (keywords.includes(token.value!)) {
				token.kind = 'Keyword';
			}
		}
	});

	return {
		type: 'program',
		body: Tokens
	};
}
