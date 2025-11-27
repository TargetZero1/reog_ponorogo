-- Reog Ponorogo Database Schema
-- Generated from Laravel migrations

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at DATETIME NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at DATETIME NULL,
    updated_at DATETIME NULL
);

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NULL,
    attraction_name VARCHAR(255) NULL,
    quantity INTEGER DEFAULT 1,
    visit_date DATE NULL,
    total_price DECIMAL(10,2) NULL,
    payment_status VARCHAR(255) DEFAULT 'pending',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    payload LONGTEXT NOT NULL,
    last_activity INTEGER NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS sessions_user_id_index ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_last_activity_index ON sessions(last_activity);
CREATE INDEX IF NOT EXISTS tickets_user_id_foreign ON tickets(user_id);

-- Migrations table (for Laravel)
CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    migration VARCHAR(255) NOT NULL,
    batch INTEGER NOT NULL
);

-- Insert migration records
INSERT OR IGNORE INTO migrations (migration, batch) VALUES
('0001_01_01_000000_create_users_table', 1),
('0001_01_01_000001_create_cache_table', 1),
('0001_01_01_000002_create_jobs_table', 1),
('2025_11_16_000000_create_tickets_table', 1),
('2025_11_16_032128_add_price_and_status_to_tickets_table', 1),
('2025_11_16_040436_create_tickets_table', 1),
('2025_11_16_040953_create_users_table', 1),
('2025_11_16_041032_create_sessions_table', 1);
