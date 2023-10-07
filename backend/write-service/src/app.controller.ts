import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Write } from "./models/write.model";
import { createWriteDto } from "dto/create-write.dto";
import { updateWriteDto } from "dto/update-write.dto";

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
  async create(@Body() writeData: createWriteDto): Promise<createWriteDto> {
    const create = await this.appService.create(writeData);
    return create;
  }

  @Put("/update")
  async update(
    @Query("id") id: number,
    @Body() updateWriteDto: updateWriteDto
  ): Promise<Write> {
    const updatedData = await this.appService.updateOne(id, updateWriteDto);
    return updatedData;
  }
}
