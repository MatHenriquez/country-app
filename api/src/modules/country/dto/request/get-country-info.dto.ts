import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetCountryInfoDto {
  @ApiProperty({
    type: String,
    description: 'Country code',
    example: 'US',
  })
  @IsString({ message: 'countryCode must be a string' })
  @IsNotEmpty({ message: 'countryCode is required' })
  countryCode: string;

  constructor(countryCode: string) {
    this.countryCode = countryCode;
  }
}
