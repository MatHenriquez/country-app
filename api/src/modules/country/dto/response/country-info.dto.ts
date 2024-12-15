import { ApiProperty } from '@nestjs/swagger';
import { CountryDto } from './country.dto';
import { IsArray, IsString, IsUrl } from 'class-validator';

export class CountryInfoDto {
  @ApiProperty({
    type: [CountryDto],
    description: 'Border countries',
    example: [
      {
        countryCode: 'AD',
        name: 'Andorra',
      },
      {
        countryCode: 'FR',
        name: 'France',
      },
    ],
  })
  @IsArray()
  borderCountries: CountryDto[];

  @ApiProperty({
    type: String,
    description: 'Country flag URL',
    example: 'https://country.com/data/afg.svg',
  })
  @IsString()
  @IsUrl()
  flagUrl: string;

  @ApiProperty({
    type: String,
    description: 'Country name',
    example: 'Afghanistan',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: [Object],
    description: 'Population over time',
    example: [
      { year: 2000, population: 1000000 },
      { year: 2010, population: 1200000 },
    ],
  })
  @IsArray()
  populationOverTime: Population[];
}

type Population = {
  year: number;
  population: number;
};
