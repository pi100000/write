import { IsString, IsArray, IsOptional } from "class-validator";

export class updateWriteDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];
}
