import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { Write } from "./models/write.model";
import { createWriteDto } from "dto/create-write.dto";
import { updateWriteDto } from "dto/update-write.dto";
import { drizzle } from "drizzle-orm/node-postgres";
import { writeTable } from "database/schema";
import { eq, ilike, sql } from "drizzle-orm";
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
    const result = await db
      .select()
      .from(writeTable)
      .where(eq(writeTable.id, id))
      .limit(1);

    return result[0] || null;
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
    const [newWrite] = await db
      .insert(writeTable)
      .values({
        title: write.title,
        content: write.content,
        tags: write.tags,
      })
      .returning();

    return newWrite;
  }

  async updateOne(
    id: number,
    updateWriteDto: updateWriteDto
  ): Promise<Write | null> {
    const [updated] = await db
      .update(writeTable)
      .set({
        title: sql`COALESCE(${updateWriteDto.title}, ${writeTable.title})`,
        content: sql`COALESCE(${updateWriteDto.content}, ${writeTable.content})`,
        tags: sql`COALESCE(${updateWriteDto.tags}, ${writeTable.tags})`,
      })
      .where(eq(writeTable.id, id))
      .returning();

    return updated || null;
  }

  async delete(id: number): Promise<void> {
    await db.delete(writeTable).where(eq(writeTable.id, id));
  }

  async searchByTitle(searchTerm: string): Promise<Write[]> {
    return await db
      .select()
      .from(writeTable)
      .where(ilike(writeTable.title, `%${searchTerm}%`));
  }
}
