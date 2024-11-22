# PostgreSQL vs Redis benchmark

## How to run

1. Set up the python environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

1. Set up the databases:

   ```bash
   docker-compose up -d
   ```

1. Run the benchmark:

   ```bash
   python benchmark.py
   ```
