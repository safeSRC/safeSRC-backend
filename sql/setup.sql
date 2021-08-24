DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS us_states CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE us_states (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      us_state TEXT NOT NULL
);

CREATE TABLE cities (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      city TEXT NOT NULL,
      state_id INTEGER NOT NULL REFERENCES us_states(id)
);

CREATE TABLE categories (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      category TEXT NOT NULL
);

 CREATE TABLE resources (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      src_name TEXT NOT NULL,
      src_description TEXT NOT NULL,
      st_address TEXT,
      city_id INTEGER NOT NULL REFERENCES cities(id),
      zip TEXT,
      county TEXT,
      state_id INTEGER NOT NULL REFERENCES us_states(id),
      main_number VARCHAR(20) NOT NULL,
      alt_number VARCHAR(20),
      email VARCHAR(256),
      website TEXT,
      category_id INTEGER NOT NULL REFERENCES categories(id),
      tags TEXT[]
);
