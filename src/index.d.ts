type Token = {
	kind: string;
	value?: string;
};

type AST = {
	type: 'program';
	body: Array<Token>;
};
