import { test, expect, beforeEach, afterEach, describe } from "vitest";
import { PollService } from "@/services/poll.service";
import { db } from "@/storage/db/drizzle";
import { users } from "@/storage/db/schemas/users";
import { eq } from "drizzle-orm";

describe("PollService", () => {
  beforeEach(async () => {
    await db.insert(users).values({
      id: "1",
      email: "foo@bar.com",
      username: "foo",
    });
  });

  afterEach(async () => {
    await db.delete(users).where(eq(users.id, "1"));
  });

  test("create poll", async () => {
    const poll = await PollService.create({
      question: "What is your favorite color?",
      userId: "1",
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
      userId: "1",
    });
    const polls = await PollService.findAll();

    expect(polls.length).toEqual(1);
  });

  test("update user", async () => {
    const poll = await PollService.create({
      question: "What is your favorite color?",
      userId: "1",
    });
    const updatedPoll = await PollService.update(poll.id, {
      question: "What is your favorite food?",
      userId: "1",
    });

    expect(updatedPoll.question).toEqual("What is your favorite food?");
  });

  test("delete user", async () => {
    const poll = await PollService.create({
      question: "What is your favorite color?",
      userId: "1",
    });
    await PollService.delete(poll.id);
    const polls = await PollService.findAll();

    expect(polls.length).toEqual(0);
  });
});
