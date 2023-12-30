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

	eat(num: number = 1) {
		this.buffer += this.content.substring(
			this.cursor + 1,
			this.cursor + num + 1
		);
		this.cursor += num;
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

	startsWith(str: RegExp, num: number = 1) {
		if (str.test(this.buffer + this.next(num - 1))) {
			this.eat(num - 1);
			return true;
		}
		return false;
	}

	notEndsWith(str: RegExp, num: number) {
		if (!str.test(this.next(num)) && this.next() !== '') {
			return true;
		}
		this.eat(num);
		return false;
	}

	token(): Token {
		if (this.startsWith(/^[ \t]+$/g)) {
			return { kind: 'whitespace' };
		}
		if (this.startsWith(/\r\n?|\n|\u2028|\u2029/g)) {
			return { kind: 'newline' };
		}
		if (this.startsWith(/[a-zA-Z_]+/g)) {
			while (/[a-zA-Z0-9_]+/g.test(this.next())) {
				this.eat();
			}
			return { kind: 'Identifier', value: this.buffer };
		}
		if (this.startsWith(/[0-9]+/g)) {
			while (/[0-9]+/g.test(this.next())) {
				this.eat();
			}
			return { kind: 'NumericLiteral', value: this.buffer };
		}
		if (this.startsWith(/\/\//g, 2)) {
			while (this.notEndsWith(/\r\n?|\n|\u2028|\u2029/g, 1)) {
				this.eat();
			}
			return { kind: 'Comment', value: this.buffer };
		}
		if (this.startsWith(/\/\*/g, 2)) {
			while (this.notEndsWith(/\*\//g, 2)) {
				this.eat();
			}
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
