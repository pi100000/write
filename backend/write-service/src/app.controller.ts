import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { Write } from "./models/write.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/test")
  async findAll(): Promise<any[]> {
    const query = "SELECT * FROM write";

    try {
      const data = await this.appService.query(query);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Post("/write")
  async create(@Body() writeData: Write): Promise<Write> {
    const create = await this.appService.create(writeData);
    return create;
  }
}
