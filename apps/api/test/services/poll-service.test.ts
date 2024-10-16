import { test, expect } from "vitest";
import { PollService } from "@/services/poll-service";

test("create poll", async () => {
  const poll = await PollService.create({
    question: "What is your favorite color?",
  });

  expect(poll.question).toEqual("What is your favorite color?");
});

test("list users - empty", async () => {
  const polls = await PollService.findAll();

  expect(polls.length).toEqual(0);
});

test("list users - one user", async () => {
  await PollService.create({
    question: "What is your favorite color?",
  });
  const polls = await PollService.findAll();

  expect(polls.length).toEqual(1);
});

test("update user", async () => {
  const poll = await PollService.create({
    question: "What is your favorite color?",
  });
  const updatedPoll = await PollService.update(poll.id, {
    question: "What is your favorite food?",
  });

  expect(updatedPoll.question).toEqual("What is your favorite food?");
});

test("delete user", async () => {
  const poll = await PollService.create({
    question: "What is your favorite color?",
  });
  await PollService.delete(poll.id);
  const polls = await PollService.findAll();

  expect(polls.length).toEqual(0);
});
