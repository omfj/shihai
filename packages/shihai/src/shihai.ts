import { getMe, login, logout, register } from "./api/auth/auth.fetch";
import { createApi } from "./api/client";
import {
  createPoll,
  deletePoll,
  getPollById,
  getPolls,
  updatePoll,
  votePoll,
} from "./api/polls/polls.fetch";
import {
  getPollsCount,
  getUserCount,
  getVotesCount,
} from "./api/stats/stats.fetch";
import { getViews, incrementViews } from "./api/views/views.fetch";

export type ShihaiOptions = {
  url: string;
};

export const createShihai = (options: ShihaiOptions) => {
  const api = createApi(options.url);

  return {
    polls: {
      get: {
        byId: getPollById(api),
        all: getPolls(api),
      },
      create: createPoll(api),
      vote: votePoll(api),
      update: updatePoll(api),
      delete: deletePoll(api),
    },
    auth: {
      get: {
        me: getMe(api),
      },
      register: register(api),
      login: login(api),
      logout: logout(api),
    },
    views: {
      get: getViews(api),
      increment: incrementViews(api),
    },
    stats: {
      users: {
        count: getUserCount(api),
      },
      votes: {
        count: getVotesCount(api),
      },
      polls: {
        count: getPollsCount(api),
      },
    },
  };
};
