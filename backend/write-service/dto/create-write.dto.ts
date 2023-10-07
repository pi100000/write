import { IsString, IsArray } from "class-validator";

export class createWriteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  tags: string[];
}
