import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { DatabaseService } from "./database/database.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService
  ) {}

  @Get("/test")
  async findAll(): Promise<any[]> {
    const query = "SELECT * FROM table1";

    try {
      const data = await this.databaseService.query(query);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
