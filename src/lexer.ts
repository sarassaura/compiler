import { TokenLiteral, TokenKind } from './types';

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
		if (token.kind == 'ignore') return;

		this.tokens.push(token);
	}

	startsWith(str: RegExp, num: number = 1) {
		if (str.test(this.buffer + this.next(num - 1))) {
			this.eat(num - 1);
			return true;
		}
		return false;
	}

	notEndsWith(str: RegExp, num: number = 1) {
		if (!str.test(this.next(num)) && this.next() !== '') {
			return true;
		}
		this.eat(num);
		return false;
	}

	token(): Token {
		for (let i = 0; i < TokenKind.length; i++) {
			if (this.startsWith(TokenKind[i].start, TokenKind[i].startLength)) {
				if (TokenKind[i].middle != undefined) {
					while (TokenKind[i].middle!.test(this.next())) {
						this.eat();
					}
				}
				if (TokenKind[i].end != undefined) {
					while (
						this.notEndsWith(TokenKind[i].end!, TokenKind[i].startLength)
					) {
						this.eat();
					}
				}
				return {
					kind: TokenKind[i].kind,
					...(!TokenKind[i].literal && { value: this.buffer })
				};
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
