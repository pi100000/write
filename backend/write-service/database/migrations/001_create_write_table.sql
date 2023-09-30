CREATE TABLE write (
  id serial PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  tags VARCHAR[]
);
