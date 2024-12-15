import { ApiProperty } from '@nestjs/swagger';
import { CountryDto } from './country.dto';
import { IsArray, IsNumber } from 'class-validator';

export class FoundCountriesDto {
  @ApiProperty({
    type: [CountryDto],
    description: 'List of countries',
    example: [
      {
        id: 1,
        name: 'Afghanistan',
        code: 'AF',
      },
      {
        id: 2,
        name: 'Albania',
        code: 'AL',
      },
    ],
  })
  @IsArray()
  countries: CountryDto[];

  @ApiProperty({
    type: Number,
    description: 'Total number of countries',
    example: 250,
  })
  @IsNumber()
  totalPages: number;

  constructor(countries: CountryDto[], totalPages: number) {
    this.countries = countries;
    this.totalPages = totalPages;
  }
}
