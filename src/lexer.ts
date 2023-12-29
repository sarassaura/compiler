import { TokenLiteral, keywords } from './types';

export default function lexer(str: string): Array<Token> {
	const t = new Tokenizer(str);

	if (!str.length) {
		return [];
	}

	while (t.cursor < str.length) {
		t.create(t.token());
		t.advance();
	}

	return t.tokens;
}

class Tokenizer {
	content: string;
	cursor: number;
	buffer: string;
	tokens: Array<Token>;
	constructor(content: string) {
		this.content = content;
		this.cursor = 0;
		this.buffer = content[0];
		this.tokens = [];
	}

	advance() {
		this.cursor++;
		this.cursor < this.content.length &&
			(this.buffer = this.content[this.cursor]);
	}

	eat() {
		this.cursor++;
		this.buffer += this.content.substring(this.cursor, this.cursor + 1);
	}

	next(num: number = 1) {
		return this.cursor + num < this.content.length
			? this.content.substring(this.cursor + 1, this.cursor + num + 1)
			: '';
	}

	create(token: Token) {
		if (token.kind == 'whitespace' || token.kind == 'newline') return;

		this.tokens.push(token);
	}

	token(): Token {
		if (/^[ \t]+$/g.test(this.buffer)) {
			return { kind: 'whitespace' };
		}
		if (/\r\n?|\n|\u2028|\u2029/g.test(this.buffer)) {
			return { kind: 'newline' };
		}
		if (/[a-zA-Z_]+/g.test(this.buffer)) {
			while (/[a-zA-Z0-9_]+/g.test(this.next())) {
				this.eat();
			}

			for (const keyword of keywords) {
				if (this.buffer == keyword) {
					return { kind: 'Keyword', value: this.buffer };
				}
			}
			return { kind: 'Identifier', value: this.buffer };
		}
		if (/[0-9]+/g.test(this.buffer)) {
			while (/[0-9]+/g.test(this.next())) {
				this.eat();
			}
			return { kind: 'NumericLiteral', value: this.buffer };
		}
		if (this.buffer + this.next() == '//') {
			this.eat();
			while (this.next() !== '\n' && this.next() !== '') {
				this.eat();
			}
			return { kind: 'Comment', value: this.buffer };
		}
		if (this.buffer + this.next() == '/*') {
			this.eat();
			while (this.next(2) !== '*/' && this.next() !== '') {
				this.eat();
			}
			this.eat();
			this.eat();
			return { kind: 'CommentMultiline', value: this.buffer };
		}
		for (const string of ['"', "'", '`']) {
			if (this.buffer == string) {
				while (this.next() !== string && this.next() !== '') {
					this.eat();
				}
				this.eat();
				return { kind: 'String', value: this.buffer };
			}
		}
		for (let i = 0; i < TokenLiteral.length; i++) {
			if (TokenLiteral[i] == this.buffer) {
				return { kind: TokenLiteral[i] };
			}
		}

		return { kind: 'INVALID', value: this.buffer };
	}
}
