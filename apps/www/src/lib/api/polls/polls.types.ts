export type SimplePoll = {
	id: string;
	question: string;
	votes: number;
};

export type CreatePollInput = {
	question: string;
	options: Array<string>;
};

export type CreatePollResult =
	| {
			success: false;
			error: string;
	  }
	| {
			success: true;
			data: SimplePoll;
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

export type VotePollInput = {
	pollId: string;
	voteOptionId: string;
};
