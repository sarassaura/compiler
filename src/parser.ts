import lexer from './lexer';

export default function parser(str: string): AST {
	return {
		type: 'program',
		body: lexer(str)
	};
}
