type Token = {
	kind: string;
	value?: string;
	start: number;
	end: number;
};

type AST = {
	type: 'program';
	body: Array<Token>;
};
