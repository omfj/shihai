import { PollService } from "@/services/poll.service";
import { auth } from "@/middleware/auth";
import { CreatePollSchema, UpdatePollSchema } from "@/lib/validators";
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
    userId: c.var.auth.user.id,
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

app.put("/poll/:id", auth(), async (c) => {
  const id = c.req.param("id");
  const { success, data } = await c.req.json().then(UpdatePollSchema.safeParse);

  if (!success) {
    return c.json(
      { success: false, error: "Invalid poll data" },
      {
        status: 400,
      },
    );
  }

  const poll = await PollService.find(id);

  if (!poll) {
    return c.json(
      { success: false, error: "Poll not found" },
      {
        status: 404,
      },
    );
  }

  if (poll.userId !== c.var.auth.user.id) {
    return c.json(
      { success: false, error: "You do not have permission to edit this poll" },
      {
        status: 403,
      },
    );
  }

  const optionsWithOrder = data.options.map((option, index) => ({
    ...option,
    order: index,
  }));

  /**
   * Update
   */

  await PollService.update(id, {
    question: data.question,
    expiresAt: data.expiresAt,
    userId: c.var.auth.user.id,
  });

  /**
   * Create or update options
   */

  const existingOptions = optionsWithOrder.map((option) => option.id).filter(Boolean);

  const newOptions = optionsWithOrder
    ?.filter((option) => !option.id || !existingOptions.includes(option.id))
    .map((option) => ({
      caption: option.caption,
      pollId: id,
      order: option.order,
    }));

  await VoteOptionService.createMany(newOptions);

  const oldOptions = optionsWithOrder
    .filter((option) => option.id && existingOptions.includes(option.id))
    .map((option) => ({
      id: option.id!,
      caption: option.caption,
      order: option.order,
      pollId: id,
    }));

  await VoteOptionService.updateMany(oldOptions);

  /**
   * Delete options that removed from the poll
   */

  const deletedOptions = poll.options
    .filter((option) => !existingOptions.includes(option.id))
    .map((option) => option.id);

  await VoteOptionService.deleteMany(deletedOptions);

  return c.json({ success: true, data: await PollService.find(id) });
});

app.delete("/poll/:id", auth(), async (c) => {
  const id = c.req.param("id");

  const poll = await PollService.find(id);

  if (!poll) {
    return c.json(
      { success: false, error: "Poll not found" },
      {
        status: 404,
      },
    );
  }

  if (poll.userId !== c.var.auth.user.id) {
    return c.json(
      { success: false, error: "You do not have permission to delete this poll" },
      {
        status: 403,
      },
    );
  }

  await PollService.delete(id);

  return c.json({ success: true });
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

  /**
   * Update vote if it exists, delete it if the user is voting for the same option
   */
  if (vote) {
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

  /**
   * Create a new vote
   */

  await VoteService.create({
    pollId,
    userId,
    voteOptionId: optionId,
  });

  return c.text("OK");
});

export default app;
