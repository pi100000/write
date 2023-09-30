import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { Write } from "./models/write.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/get")
  async get(): Promise<Write[]> {
    const data = await this.appService.getAll();
    return data;
  }

  @Post("/write")
  async create(@Body() writeData: Write): Promise<Write> {
    const create = await this.appService.create(writeData);
    return create;
  }
}
