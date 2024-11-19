import { createClient } from "redis";

const ANALYTICS_CHANNEL = "analytics";

const pubSubClient = createClient({
  url: process.env.REDIS_URL,
});

const publisherClient = createClient({
  url: process.env.REDIS_URL,
});

const processAnalytics = async (message: string) => {
  console.log(`Processing analytics: ${message}`);
};

export const setupMessaging = async () => {
  if (!pubSubClient.isOpen) {
    await pubSubClient.connect();
  }

  /**
   * Subscribe to the analytics channel
   */
  await pubSubClient.subscribe(ANALYTICS_CHANNEL, async (message) => {
    await processAnalytics(message);
  });
};

export const publishAnalytics = async (message: string) => {
  if (!publisherClient.isOpen) {
    await publisherClient.connect();
  }

  await publisherClient.publish(ANALYTICS_CHANNEL, message);
};
