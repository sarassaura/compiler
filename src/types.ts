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

const TokenLiteral = [
	{ kind: '=', start: /\=/, startLength: 1, literal: true, tail: true },
	{ kind: '(', start: /\(/, startLength: 1, literal: true, tail: true },
	{ kind: ')', start: /\)/, startLength: 1, literal: true, tail: true },
	{ kind: '{', start: /\{/, startLength: 1, literal: true, tail: true },
	{ kind: '}', start: /\}/, startLength: 1, literal: true, tail: true },
	{ kind: '[', start: /\[/, startLength: 1, literal: true, tail: true },
	{ kind: ']', start: /\]/, startLength: 1, literal: true, tail: true },
	{ kind: '>', start: /\>/, startLength: 1, literal: true, tail: true },
	{ kind: '<', start: /\</, startLength: 1, literal: true, tail: true },
	{ kind: '+', start: /\+/, startLength: 1, literal: true, tail: true },
	{ kind: '-', start: /\-/, startLength: 1, literal: true, tail: true },
	{ kind: '*', start: /\*/, startLength: 1, literal: true, tail: true },
	{ kind: '/', start: /\//, startLength: 1, literal: true, tail: true },
	{ kind: '%', start: /\%/, startLength: 1, literal: true, tail: true },
	{ kind: '.', start: /\./, startLength: 1, literal: true, tail: true },
	{ kind: ',', start: /\,/, startLength: 1, literal: true, tail: true },
	{ kind: ';', start: /\;/, startLength: 1, literal: true, tail: true },
	{ kind: ':', start: /\:/, startLength: 1, literal: true, tail: true },
	{ kind: '!', start: /\!/, startLength: 1, literal: true, tail: true },
	{ kind: '?', start: /\?/, startLength: 1, literal: true, tail: true },
	{ kind: '&', start: /\&/, startLength: 1, literal: true, tail: true },
	{ kind: '|', start: /\|/, startLength: 1, literal: true, tail: true }
];

export const TokenKind: Array<{
	kind: string;
	start: RegExp;
	startLength: number;
	end?: RegExp;
	endLength?: number;
	literal: boolean;
	tail: boolean;
}> = [
	{
		kind: 'ignore',
		start: /[ \t]|\r\n?|\n|\u2028|\u2029/,
		startLength: 1,
		end: /(?![\r\n?|\n|\u2028|\u2029|\t| ]+)(.)/,
		endLength: 1,
		literal: true,
		tail: false
	},
	{
		kind: 'Identifier',
		start: /[a-zA-Z_]+/,
		startLength: 1,
		end: /(?![a-zA-Z0-9_]+)(.)/,
		endLength: 1,
		literal: false,
		tail: false
	},
	{
		kind: 'NumericLiteral',
		start: /[0-9]+/,
		startLength: 1,
		end: /(?![0-9]+)(.)/,
		endLength: 1,
		literal: false,
		tail: false
	},
	{
		kind: 'Comment',
		start: /\/\//,
		startLength: 2,
		end: /\r\n?|\n|\u2028|\u2029/,
		endLength: 1,
		literal: false,
		tail: true
	},
	{
		kind: 'CommentMultiline',
		start: /\/\*/,
		startLength: 2,
		end: /\*\//,
		endLength: 2,
		literal: false,
		tail: true
	},
	{
		kind: 'String',
		start: /\"/,
		startLength: 1,
		end: /\"/,
		endLength: 1,
		literal: false,
		tail: true
	},
	{
		kind: 'String',
		start: /\'/,
		startLength: 1,
		end: /\'/,
		endLength: 1,
		literal: false,
		tail: true
	},
	{
		kind: 'String',
		start: /\`/,
		startLength: 1,
		end: /\`/,
		endLength: 1,
		literal: false,
		tail: true
	},
	...TokenLiteral
];
