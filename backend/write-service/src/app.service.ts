import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { Write } from "./models/write.model";
import { createWriteDto } from "dto/create-write.dto";
import { updateWriteDto } from "dto/update-write.dto";
import { drizzle } from "drizzle-orm/node-postgres";
import { writeTable } from "database/schema";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

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
      const { rows } = await client.query({
        text: `SELECT * FROM write WHERE id = $1`,
        values: [id],
      });
      return rows[0] || null;
    } finally {
      client.release();
    }
  }

  async getAll(): Promise<Write[]> {
    const client = await this.pool.connect();
    try {
      const rows = await db.select().from(writeTable);
      return rows;
    } finally {
      client.release();
    }
  }

  async create(write: createWriteDto): Promise<createWriteDto> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query({
        text: `INSERT INTO write(title, content, tags) VALUES($1, $2, $3) RETURNING *`,
        values: [write.title, write.content, write.tags],
      });
      return rows[0];
    } finally {
      client.release();
    }
  }

  async updateOne(
    id: number,
    updateWriteDto: updateWriteDto
  ): Promise<Write | null> {
    const client = await this.pool.connect();
    try {
      const query = {
        text: `
          UPDATE write
          SET
            title = COALESCE($2, title),
            content = COALESCE($3, content),
            tags = COALESCE($4, tags)
          WHERE id = $1
          RETURNING *
          `,
        values: [
          id,
          updateWriteDto.title,
          updateWriteDto.content,
          updateWriteDto.tags,
        ],
      };

      const { rows } = await client.query(query);
      return rows[0] || null;
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query("DELETE FROM write WHERE id = $1", [id]);
    } finally {
      client.release();
    }
  }
}
