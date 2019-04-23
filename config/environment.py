import os

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/qraft')
secret = os.getenv('SECRET', 'it\s a secret')
