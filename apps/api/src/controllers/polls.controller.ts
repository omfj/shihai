import { PollService } from "@/services/poll.service";
import { auth } from "@/middleware/auth";
import { CreatePollSchema } from "@/lib/validators";
import { VoteOptionService } from "@/services/vote-option.service";
import { VoteService } from "@/services/vote.service";
import { createApp } from "@/lib/app";
import { isPast } from "date-fns";

const app = createApp();

app.get("/polls", async (c) => {
  const polls = await PollService.findAll();

  return c.json(polls);
});

app.post("/poll", auth(), async (c) => {
  const { success, data } = await c.req.json().then(CreatePollSchema.safeParse);

  if (!success) {
    return c.json(
      { success: false, error: "Invalid poll data" },
      {
        status: 400,
      },
    );
  }

  const poll = await PollService.create({
    question: data.question,
    expiresAt: data.expiresAt,
  });

  const optionsWithOrder = data.options.map((option, index) => ({
    caption: option,
    order: index,
  }));

  const voteOptions = optionsWithOrder.map((option) => ({
    ...option,
    pollId: poll.id,
  }));

  await VoteOptionService.createMany(voteOptions);

  return c.json({
    success: true,
    data: {
      ...poll,
      votes: 0,
    },
  });
});

app.get("/poll/:id", async (c) => {
  const id = c.req.param("id");

  const poll = await PollService.find(id);

  if (!poll) {
    return c.json(null, {
      status: 404,
    });
  }

  return c.json(poll);
});

app.post("/poll/:pollId/vote/:optionId", auth(), async (c) => {
  const pollId = c.req.param("pollId");
  const optionId = c.req.param("optionId");
  const userId = c.var.auth.user.id;

  const poll = await PollService.find(pollId);

  if (!poll) {
    return c.json(
      { error: "Poll not found" },
      {
        status: 404,
      },
    );
  }

  if (poll.expiresAt && isPast(poll.expiresAt)) {
    return c.json(
      { error: "Poll has expired" },
      {
        status: 400,
      },
    );
  }

  const option = poll.options.find((o) => o.id === optionId);

  if (!option) {
    return c.json(
      { error: "Option not found" },
      {
        status: 404,
      },
    );
  }

  const vote = await VoteService.find({
    pollId,
    userId,
  });

  const hasVoted = !!vote;

  if (hasVoted) {
    const isSameOption = vote.voteOptionId === optionId;

    if (isSameOption) {
      await VoteService.delete({
        pollId,
        userId,
      });
    } else {
      await VoteService.update({
        pollId,
        userId,
        voteOptionId: optionId,
      });
    }

    return c.text("OK");
  }

  await VoteService.create({
    pollId,
    userId,
    voteOptionId: optionId,
  });

  return c.text("OK");
});

export default app;
