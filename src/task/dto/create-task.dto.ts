import { IsString, IsOptional, IsDate, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
