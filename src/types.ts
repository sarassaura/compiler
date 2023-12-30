export const TokenLiteral = [
	'=',
	'(',
	')',
	'{',
	'}',
	'[',
	']',
	'>',
	'<',
	'+',
	'-',
	'*',
	'/',
	'%',
	'.',
	',',
	';',
	':',
	'!',
	'?',
	'&',
	'|'
];

export const keywords = [
	'abstract',
	'arguments',
	'await',
	'boolean',
	'break',
	'byte',
	'case',
	'catch',
	'char',
	'class',
	'const',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'double',
	'else',
	'enum',
	'eval',
	'export',
	'extends',
	'false',
	'final',
	'finally',
	'float',
	'for',
	'function',
	'goto',
	'if',
	'implements',
	'import',
	'in',
	'instanceof',
	'int',
	'interface',
	'let',
	'long',
	'native',
	'new',
	'null',
	'package',
	'private',
	'protected',
	'public',
	'return',
	'short',
	'static',
	'super',
	'switch',
	'synchronized',
	'this',
	'throw',
	'throws',
	'transient',
	'true',
	'try',
	'typeof',
	'var',
	'void',
	'volatile',
	'while',
	'with',
	'yield',
	'document',
	'window'
];

export const TokenKind: Array<{
	kind: string;
	start: RegExp;
	startLength: number;
	middle?: RegExp;
	end?: RegExp;
	endLength?: number;
	literal: boolean;
}> = [
	{
		kind: 'ignore',
		start: /[ \t]|\r\n?|\n|\u2028|\u2029/,
		startLength: 1,
		middle: /[ \t]|\r\n?|\n|\u2028|\u2029/,
		literal: true
	},
	{
		kind: 'Identifier',
		start: /[a-zA-Z_]+/,
		startLength: 1,
		middle: /[a-zA-Z0-9_]+/,
		literal: false
	},
	{
		kind: 'NumericLiteral',
		start: /[0-9]+/,
		startLength: 1,
		middle: /[0-9]+/,
		literal: false
	},
	{
		kind: 'Comment',
		start: /\/\//,
		startLength: 2,
		end: /\r\n?|\n|\u2028|\u2029/,
		endLength: 1,
		literal: false
	},
	{
		kind: 'CommentMultiline',
		start: /\/\*/,
		startLength: 2,
		end: /\*\//,
		endLength: 2,
		literal: false
	},
	{
		kind: 'String',
		start: /\"/,
		startLength: 1,
		end: /\"/,
		endLength: 1,
		literal: false
	},
	{
		kind: 'String',
		start: /\'/,
		startLength: 1,
		end: /\'/,
		endLength: 1,
		literal: false
	},
	{
		kind: 'String',
		start: /\`/,
		startLength: 1,
		end: /\`/,
		endLength: 1,
		literal: false
	}
];
