import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { Write } from "./models/write.model";

@Injectable()
export class AppService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async getOne(id: number): Promise<Write | null> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query("SELECT * FROM write WHERE id = $1", [
        id,
      ]);
      return rows[0] || null;
    } finally {
      client.release();
    }
  }

  async getAll(): Promise<Write[]> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query("SELECT * FROM write");
      return rows;
    } finally {
      client.release();
    }
  }

  async create(write: Write): Promise<Write> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query(
        "INSERT INTO write(title, content, tags) VALUES($1, $2, $3) RETURNING *",
        [write.title, write.content, write.tags]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }
}
