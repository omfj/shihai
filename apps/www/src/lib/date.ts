type Dateish = string | number | Date;

export const format = (d: Dateish) => {
	const date = new Date(d);

	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	}).format(date);
};
