import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  COUNTRY_SERVICE,
  ICountryService,
} from './interfaces/country-service.interface';
import { GetCountriesDto } from './dto/request/get-countries.dto';
import { GetCountryInfoDto } from './dto/request/get-country-info.dto';

@Controller('country')
@ApiTags('country')
export class CountryController {
  constructor(
    @Inject(COUNTRY_SERVICE) private readonly countryService: ICountryService,
  ) {}

  @ApiOperation({
    summary: 'Get paginated countries',
    description:
      'Get paginated countries with the specified page number and page size',
    parameters: [
      { name: 'pageNumber', in: 'query', required: true },
      { name: 'pageSize', in: 'query', required: true },
    ],
  })
  @Get()
  async getCountries(@Query() getCountriesDto: GetCountriesDto) {
    const response = await this.countryService.getCountries(getCountriesDto);

    if (response.isSuccess) {
      return response.value;
    } else {
      throw new HttpException(response.error.message, response.error.status);
    }
  }

  @ApiOperation({
    summary: 'Get country information',
    description: 'Get country information by country code',
    parameters: [{ name: 'countryCode', in: 'path', required: true }],
  })
  @Get('/:countryCode')
  async getCountryInfo(@Param() countryCode: GetCountryInfoDto) {
    const response = await this.countryService.getCountryInfo(countryCode);

    if (response.isSuccess) {
      return response.value;
    } else {
      throw new HttpException(response.error.message, response.error.status);
    }
  }
}
