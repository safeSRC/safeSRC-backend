DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE users(
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
);

CREATE TABLE cities (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      city TEXT NOT NULL);

CREATE TABLE categories (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      category TEXT NOT NULL
);

CREATE TABLE resources (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      src_name TEXT NOT NULL,
      src_description TEXT NOT NULL,
      city_id INTEGER NOT NULL REFERENCES cities(id),
      info TEXT [],
      category_id INTEGER NOT NULL REFERENCES categories(id),
      tags TEXT[]
);
INSERT INTO categories (category) VALUES ('uncategorized');