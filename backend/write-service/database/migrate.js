const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// test-connection
// pool.connect((err, client, done) => {
//   if (err) {
//     console.error("Error connecting to PostgreSQL:", err);
//   } else {
//     console.log("Connected to PostgreSQL");
//   }
//   done();
// });

async function runMigrations() {
  const client = await pool.connect();
  try {
    const migrationDir = path.join(__dirname, "migrations");
    const files = fs.readdirSync(migrationDir);

    files.sort();

    for (const file of files) {
      const filePath = path.join(migrationDir, file);
      const sql = fs.readFileSync(filePath, "utf-8");
      await client.query(sql);
      console.log(`Applied migration: ${file}`);
    }
  } finally {
    client.release();
  }
}

runMigrations()
  .then(() => {
    console.log("All migrations applied successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error applying migrations:", error);
    process.exit(1);
  });
