export interface Movie {
	title: string;
	year: number;
}

export interface MovieDocument extends Movie {
	_id: string;
	__v: number;
}
