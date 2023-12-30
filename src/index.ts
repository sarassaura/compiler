///<reference path="./index.d.ts" />

import parser from './parser';

console.log(
	parser(
		`import       { TokenLiteral, keywords } from './types';
		// Hello
		s
		/*
			Mua
		*/
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
			}`
	)
);
