DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS us_states CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS categories;

 CREATE TABLE resources (
      id SERIAL PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      src_description TEXT NOT NULL,
      st_address TEXT,
      city_id INTEGER NOT NULL,
      zip TEXT,
      county TEXT,
      state_id INTEGER NOT NULL,
      main_number VARCHAR(20) NOT NULL,
      alt_number VARCHAR(20),
      email VARCHAR(256),
      website TEXT,
      category_id INTEGER NOT NULL,
      tags TEXT[],
);

CREATE TABLE us_states (
      id SERIAL PRIMARY KEY NOT NULL REFERENCES resources(state_id),
      us_state TEXT NOT NULL
      
);

CREATE TABLE cities (
      id SERIAL PRIMARY KEY NOT NULL REFERENCES resources(city_id),
      city TEXT NOT NULL,
      state_id INTEGER NOT NULL REFERENCES us_states(id)
);

CREATE TABLE categories (
      id SERIAL PRIMARY KEY NOT NULL REFERENCES resources(category_id),
      category TEXT NOT NULL
);
