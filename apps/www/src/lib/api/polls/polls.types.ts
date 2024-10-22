export type SimplePoll = {
	id: string;
	question: string;
};

export type CreatePollInput = {
	question: string;
	options: Array<string>;
};

export type Poll = {
	id: string;
	question: string;
	options: Array<{
		id: string;
		caption: string;
		order: number;
	}>;
	votes: Array<{
		userId: string;
		voteOptionId: string;
		createdAt: string;
	}>;
};
