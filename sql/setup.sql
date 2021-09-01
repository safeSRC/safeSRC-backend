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
      city TEXT NOT NULL
);

CREATE TABLE categories (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      category TEXT NOT NULL
);

CREATE TABLE resources (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      src_name TEXT NOT NULL,
      src_description TEXT NOT NULL,
      city_id INTEGER NOT NULL,
      info TEXT [],
      category_id INTEGER NOT NULL,
      tags TEXT [],
      -- to make sure the relationships between tables maintain
      -- data integrity, set the FOREIGN KEY constraint
      -- and ensure related records get deleted if a city
      -- or category gets deleted by using ON DELETE CASCADE
      FOREIGN KEY(city_id) REFERENCES cities(id) ON DELETE CASCADE,
      FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO categories (category) VALUES ('uncategorized');
