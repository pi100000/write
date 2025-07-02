import { IsString, IsArray, IsNotEmpty } from "class-validator";

export class createWriteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsNotEmpty()
  tags: string[];
}
