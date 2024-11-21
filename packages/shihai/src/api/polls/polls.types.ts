export type SimplePoll = {
	id: string;
	question: string;
	votes: number;
	createdAt: string;
	expiresAt: string | null;
};

export type CreatePollInput = {
	question: string;
	expiresAt: string | null;
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

export type VoteOption = {
	id: string;
	caption: string;
	order: number;
};

export type Vote = {
	userId: string;
	voteOptionId: string;
	createdAt: string;
};

export type Poll = {
	id: string;
	question: string;
	expiresAt: string | null;
	createdAt: string;
	options: Array<VoteOption>;
	votes: Array<Vote>;
};

export type VotePollInput = {
	pollId: string;
	voteOptionId: string;
};
