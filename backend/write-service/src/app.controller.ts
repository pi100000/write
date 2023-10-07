import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { Write } from "./models/write.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/getAll")
  async getAll(): Promise<Write[]> {
    const data = await this.appService.getAll();
    return data;
  }

  @Get("/getOne")
  async getOne(@Query("id") id: number): Promise<Write> {
    const data = await this.appService.getOne(id);
    return data;
  }

  @Post("/write")
  async create(@Body() writeData: Write): Promise<Write> {
    const create = await this.appService.create(writeData);
    return create;
  }
}
