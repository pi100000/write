import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { Write } from "./models/write.model";
import { createWriteDto } from "dto/create-write.dto";
import { updateWriteDto } from "dto/update-write.dto";
import { drizzle } from "drizzle-orm/node-postgres";
import { writeTable } from "database/schema";
import { eq, ilike, sql } from "drizzle-orm";
import * as schema from "../database/schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

@Injectable()
export class AppService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async getOne(id: number): Promise<Write | null> {
    try {
      const result = await db
        .select()
        .from(writeTable)
        .where(eq(writeTable.id, id))
        .limit(1);

      return result[0] || null;
    } catch (error) {
      console.error("error getting write:", error);
      throw new Error("failed to get write");
    }
  }

  async getAll(): Promise<Write[]> {
    const client = await this.pool.connect();
    try {
      const rows = await db.select().from(writeTable);
      return rows;
    } catch (error) {
      console.error("error getting write:", error);
      throw new Error("failed to get all write");
    }
  }

  async create(write: createWriteDto): Promise<createWriteDto> {
    try {
      const [newWrite] = await db
        .insert(writeTable)
        .values({
          title: write.title,
          content: write.content,
          tags: write.tags,
        })
        .returning();

      return newWrite;
    } catch (error) {
      console.error("error creating write:", error);
      throw new Error("failed to create write");
    }
  }

  async updateOne(
    id: number,
    updateWriteDto: updateWriteDto
  ): Promise<Write | null> {
    try {
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
    } catch (error) {
      console.error("error updating write:", error);
      throw new Error("failed to update write");
    }
  }

  async delete(id: number): Promise<void> {
    await db.delete(writeTable).where(eq(writeTable.id, id));
  }

  async searchByTitle(searchTerm: string): Promise<Write[]> {
    try {
      return await db
        .select()
        .from(writeTable)
        .where(ilike(writeTable.title, `%${searchTerm}%`));
    } catch (error) {
      console.error("error searching write:", error);
      throw new Error("failed to search write");
    }
  }
}
