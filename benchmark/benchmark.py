import psycopg2
import redis
import time
import matplotlib.pyplot as plt

USER_COUNT = 50000
GLOBAL_START_TIME = time.time()


pg_client = psycopg2.connect(
    host="localhost",
    database="benchmark",
    user="postgres",
    password="postgres"
)

redis_client = redis.Redis(
    host="localhost",
    port=6379,
    password=None
)


def pg_seed() -> None:
    pg_cursor = pg_client.cursor()

    pg_cursor.execute(
        "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255))"
    )

    for _ in range(USER_COUNT):
        pg_cursor.execute(
            "INSERT INTO users (name) VALUES ('Alice')"
        )


def redis_seed() -> None:
    for i in range(USER_COUNT):
        redis_client.set(f"users:{i + 1}", "Alice")


def seed() -> None:
    pg_seed()
    redis_seed()


def pg_tear_down() -> None:
    pg_cursor = pg_client.cursor()

    pg_cursor.execute(
        "DROP TABLE users"
    )


def redis_tear_down() -> None:
    redis_client.flushdb()


def tear_down() -> None:
    pg_tear_down()
    redis_tear_down()


def benchmark() -> None:
    pg_cursor = pg_client.cursor()

    pg_times = []
    redis_times = []

    for i in range(USER_COUNT):
        start = time.time()
        pg_cursor.execute(
            f"SELECT * FROM users WHERE id = {i + 1}"
        )
        pg_cursor.fetchall()
        end = time.time()
        pg_times.append(end - start)

    for i in range(USER_COUNT):
        start = time.time()
        redis_client.get(f"users:{i + 1}")
        end = time.time()
        redis_times.append(end - start)

    pg_avg = sum(pg_times) / len(pg_times)
    pg_median = pg_times[len(pg_times) // 2]
    pg_fastest = min(pg_times)
    pg_slowest = max(pg_times)

    redis_avg = sum(redis_times) / len(redis_times)
    redis_median = redis_times[len(redis_times) // 2]
    redis_fastest = min(redis_times)
    redis_slowest = max(redis_times)

    print(f"PostgreSQL average time: {pg_avg}")
    print(f"PostgreSQL median time: {pg_median}")
    print(f"PostgreSQL fastest time: {pg_fastest}")
    print(f"PostgreSQL slowest time: {pg_slowest}")

    print(f"Redis average time: {redis_avg}")
    print(f"Redis median time: {redis_median}")
    print(f"Redis fastest time: {redis_fastest}")
    print(f"Redis slowest time: {redis_slowest}")

    plt.plot(pg_times, label="PostgreSQL")
    plt.plot(redis_times, label="Redis")
    plt.grid()
    plt.legend()

    plt.savefig('benchmarks.png')

    if pg_avg < redis_avg:
        print("PostgreSQL is faster")
    else:
        print("Redis is faster")


if __name__ == "__main__":
    seed()
    benchmark()
    tear_down()

    print(f"Finished benchmark in {time.time() - GLOBAL_START_TIME} seconds")
