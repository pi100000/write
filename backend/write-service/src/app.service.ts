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

  async query(queryString: string, params: any[] = []): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(queryString, params);
      return result;
    } finally {
      client.release();
    }
  }

  async create(write: Write): Promise<Write> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query(
        "INSERT INTO todos(title, description) VALUES($1, $2) RETURNING *",
        [write.title, write.content, write.tags]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }
}
