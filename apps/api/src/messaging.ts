import { createClient } from "redis";
import { ViewsService } from "./services/views.service";
import { VoteAnalyticsService } from "./services/vote-analytics.service";

const VIEWS_CHANNEL = "views";
const ANALYTICS_CHANNEL = "analytics";

const pubSubClient = createClient({
  url: process.env.REDIS_URL,
});

const publisherClient = createClient({
  url: process.env.REDIS_URL,
});

const processIncrementViews = async (message: string) => {
  const { pollId, ip } = JSON.parse(message);

  await ViewsService.add(pollId, ip);
};

const processVotesTotal = async (message: string) => {
  const { pollId, type } = JSON.parse(message);

  if (type === "increment") {
    VoteAnalyticsService.increment(pollId);
  }

  if (type === "decrement") {
    VoteAnalyticsService.decrement(pollId);
  }
};

export const setupMessaging = async () => {
  if (!pubSubClient.isOpen) {
    await pubSubClient.connect();
  }

  /**
   * Subscribe to the analytics channel
   */
  pubSubClient.subscribe(VIEWS_CHANNEL, async (message) => {
    await processIncrementViews(message);
  });

  pubSubClient.subscribe(ANALYTICS_CHANNEL, async (message) => {
    await processVotesTotal(message);
  });
};

export const publishIncrementViews = async (pollId: string, ip: string) => {
  if (!publisherClient.isOpen) {
    await publisherClient.connect();
  }

  return await publisherClient.publish(VIEWS_CHANNEL, JSON.stringify({ pollId, ip }));
};

export const publishVotesTotal = async (pollId: string, type: "increment" | "decrement") => {
  if (!publisherClient.isOpen) {
    await publisherClient.connect();
  }

  return await publisherClient.publish(ANALYTICS_CHANNEL, JSON.stringify({ pollId, type }));
};
