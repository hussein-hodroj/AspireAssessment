CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date_time DATETIME NOT NULL,
    location TEXT NOT NULL,
    description TEXT NULL,
    status TEXT NULL
);