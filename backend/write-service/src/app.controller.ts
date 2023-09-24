import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/test")
  async findAll(): Promise<any[]> {
    const query = "SELECT * FROM table1";

    try {
      const data = await this.appService.query(query);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
