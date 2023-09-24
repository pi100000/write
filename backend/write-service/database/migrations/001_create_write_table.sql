CREATE TABLE write (
  id serial PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tags VARCHAR[]
);
