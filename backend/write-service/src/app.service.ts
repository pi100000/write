import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

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
}
