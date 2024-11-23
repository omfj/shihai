import psycopg2
import redis
import random
import time
import numpy as np
import matplotlib.pyplot as plt
from concurrent.futures import ThreadPoolExecutor
from rich.console import Console
from rich.table import Table

console = Console()

USER_COUNT = 50000
GLOBAL_START_TIME = time.perf_counter()

pg_client = psycopg2.connect(
    host="localhost",
    database="benchmark",
    user="postgres",
    password="postgres"
)
redis_client = redis.Redis(host="localhost", port=6379, password=None)


def pg_seed():
    pg_cursor = pg_client.cursor()
    pg_cursor.execute(
        "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255))")
    pg_cursor.executemany(
        "INSERT INTO users (name) VALUES (%s)",
        [("Alice",) for _ in range(USER_COUNT)]
    )
    pg_client.commit()
    pg_cursor.close()


def redis_seed():
    pipeline = redis_client.pipeline()
    for i in range(USER_COUNT):
        pipeline.set(f"users:{i + 1}", "Alice")
    pipeline.execute()


def seed():
    pg_seed()
    redis_seed()


def pg_tear_down():
    pg_cursor = pg_client.cursor()
    pg_cursor.execute("DROP TABLE users")
    pg_client.commit()
    pg_cursor.close()


def redis_tear_down():
    redis_client.flushdb()


def tear_down():
    pg_tear_down()
    redis_tear_down()


def benchmark_task_pg(user_id):
    pg_cursor = pg_client.cursor()
    start = time.perf_counter()
    pg_cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    pg_cursor.fetchall()
    pg_cursor.close()
    return time.perf_counter() - start


def benchmark_task_redis(user_id):
    start = time.perf_counter()
    redis_client.get(f"users:{user_id}")
    return time.perf_counter() - start


def benchmark():
    with ThreadPoolExecutor() as executor:
        pg_times = list(executor.map(
            benchmark_task_pg, (random.randint(1, USER_COUNT)
                                for _ in range(USER_COUNT))
        ))
        redis_times = list(executor.map(
            benchmark_task_redis, (random.randint(1, USER_COUNT)
                                   for _ in range(USER_COUNT))
        ))
    return pg_times, redis_times


def create_histogram(pg_times, redis_times):
    plt.hist(pg_times, bins=50, alpha=0.5, label="PostgreSQL")
    plt.hist(redis_times, bins=50, alpha=0.5, label="Redis")
    plt.title("Latency Histogram")
    plt.xlabel("Latency (seconds)")
    plt.ylabel("Frequency")
    plt.legend()
    plt.grid()
    plt.savefig("histogram.png")
    plt.clf()


def create_cdf(pg_times, redis_times):
    pg_times_sorted = np.sort(pg_times)
    redis_times_sorted = np.sort(redis_times)
    pg_cdf = np.arange(1, len(pg_times_sorted) + 1) / len(pg_times_sorted)
    redis_cdf = np.arange(1, len(redis_times_sorted) +
                          1) / len(redis_times_sorted)

    plt.plot(pg_times_sorted, pg_cdf, label="PostgreSQL")
    plt.plot(redis_times_sorted, redis_cdf, label="Redis")
    plt.title("Cumulative Distribution Function (CDF)")
    plt.xlabel("Latency (seconds)")
    plt.ylabel("Cumulative Proportion")
    plt.legend()
    plt.grid()
    plt.savefig("cdf.png")
    plt.clf()


def create_aggregate_bar_chart(pg_times, redis_times):
    labels = ["Average", "Median", "Fastest", "Slowest"]
    pg_stats = [np.mean(pg_times), np.median(pg_times),
                min(pg_times), max(pg_times)]
    redis_stats = [np.mean(redis_times), np.median(
        redis_times), min(redis_times), max(redis_times)]

    x = np.arange(len(labels))
    width = 0.35

    plt.bar(x - width/2, pg_stats, width, label="PostgreSQL")
    plt.bar(x + width/2, redis_stats, width, label="Redis")
    plt.xticks(x, labels)
    plt.title("Aggregate Latency Statistics")
    plt.ylabel("Latency (seconds)")
    plt.legend()
    plt.grid(axis='y')
    plt.savefig("aggregate_statistics.png")
    plt.clf()


def create_latency_over_time(pg_times, redis_times):
    plt.plot(range(len(pg_times)), pg_times, label="PostgreSQL", alpha=0.7)
    plt.plot(range(len(redis_times)), redis_times, label="Redis", alpha=0.7)
    plt.title("Latency Over Time")
    plt.xlabel("Request Index")
    plt.ylabel("Latency (seconds)")
    plt.legend()
    plt.grid()
    plt.savefig("latency_over_time.png")
    plt.clf()


def create_percentile_chart(pg_times, redis_times):
    percentiles = [90, 95, 99]
    pg_percentiles = [np.percentile(pg_times, p) for p in percentiles]
    redis_percentiles = [np.percentile(redis_times, p) for p in percentiles]

    x = np.arange(len(percentiles))
    width = 0.35

    plt.bar(x - width/2, pg_percentiles, width, label="PostgreSQL")
    plt.bar(x + width/2, redis_percentiles, width, label="Redis")
    plt.xticks(x, [f"{p}th" for p in percentiles])
    plt.title("Percentile Latencies")
    plt.ylabel("Latency (seconds)")
    plt.legend()
    plt.grid(axis='y')
    plt.savefig("percentile_latencies.png")
    plt.clf()


def print_table(pg_times, redis_times):
    table = Table(title="Benchmark Results")
    table.add_column("Metric")
    table.add_column("PostgreSQL")
    table.add_column("Redis")
    table.add_row("Average", f"{np.mean(pg_times):.6f}", f"{
                  np.mean(redis_times):.6f}")
    table.add_row("Median", f"{np.median(pg_times):.6f}", f"{
                  np.median(redis_times):.6f}")
    table.add_row("Fastest", f"{min(pg_times):.6f}", f"{min(redis_times):.6f}")
    table.add_row("Slowest", f"{max(pg_times):.6f}", f"{max(redis_times):.6f}")
    console.print(table)


if __name__ == "__main__":
    seed()
    pg_times, redis_times = benchmark()
    tear_down()

    # Create graphs
    create_histogram(pg_times, redis_times)
    create_cdf(pg_times, redis_times)
    create_aggregate_bar_chart(pg_times, redis_times)
    create_latency_over_time(pg_times, redis_times)
    create_percentile_chart(pg_times, redis_times)

    # Print table
    print_table(pg_times, redis_times)

    print(f"Finished benchmark in {
          time.perf_counter() - GLOBAL_START_TIME} seconds")
