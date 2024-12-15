import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCountriesDto {
  @ApiProperty({
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'pageNumber must be a number' })
  @IsInt({ message: 'pageNumber must be an integer' })
  @IsPositive({ message: 'pageNumber must be a positive number' })
  pageNumber: number;

  @ApiProperty({
    type: Number,
    description: 'Page size',
    example: 10,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'pageSize must be a number' })
  @IsInt({ message: 'pageSize must be an integer' })
  @IsPositive({ message: 'pageSize must be a positive number' })
  pageSize: number;
}
