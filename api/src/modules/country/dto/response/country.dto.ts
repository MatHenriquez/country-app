import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CountryDto {
  @ApiProperty({
    type: String,
    description: 'Country code',
    example: 'AD',
  })
  @IsString()
  countryCode: string;

  @ApiProperty({
    type: String,
    description: 'Country name',
    example: 'Andorra',
  })
  @IsString()
  name: string;

  constructor(countryCode: string, name: string) {
    this.countryCode = countryCode;
    this.name = name;
  }
}
