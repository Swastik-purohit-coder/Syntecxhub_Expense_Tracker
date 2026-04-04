CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255),
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255),
    amount NUMERIC,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);