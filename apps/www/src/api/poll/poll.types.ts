export type SimplePoll = {
  id: string;
  question: string;
};

export type Poll = SimplePoll & {
  options: Array<{
    id: string;
    caption: string;
    order: number;
  }>;
  votes: Array<{
    voteOptionId: string;
    userId: string;
    createdAt: string;
  }>;
};
