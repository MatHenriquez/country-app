import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { GetCountryInfoDto } from './dto/request/get-country-info.dto';
import { GetCountriesDto } from './dto/request/get-countries.dto';
import { CountryInfoDto } from './dto/response/country-info.dto';
import { FoundCountriesDto } from './dto/response/found-countries.dto';
import { CountryDto } from './dto/response/country.dto';
import { Result } from '@/modules/utils/result/result';
import HttpError from '@/modules/utils/error/http-error';
import { ICountryService } from './interfaces/country-service.interface';
import { Pagination } from '@/modules/utils/pagination/pagination';
import { CountryDataFetcher } from './helpers/country-data-fetcher.service';
import { ICountryNameAndBorders } from './interfaces/country-name-and-borders.interface';
import { ICountryFlag } from './interfaces/country-flag.interface';
import { ICountryHistoricalPopulation } from './interfaces/country-historical-population.interface';

@Injectable()
export class CountryService implements ICountryService {
  private readonly logger = new Logger(CountryService.name);

  constructor(private readonly dataFetcher: CountryDataFetcher) {}

  async getCountries(
    getCountriesDto: GetCountriesDto,
  ): Promise<Result<FoundCountriesDto | HttpError>> {
    const { pageNumber, pageSize } = getCountriesDto;

    this.logger.log(
      `Fetching countries - Page: ${pageNumber}, Size: ${pageSize}`,
    );

    const countriesResult = await this.dataFetcher.fetchAllCountries();
    if (!countriesResult.isSuccess) {
      return Result.failure(countriesResult.error);
    }

    const countries = countriesResult.value as CountryDto[];

    if (pageSize > countries.length) {
      this.logger.warn('Invalid page size');
      return Result.failure(
        new HttpError(HttpStatus.BAD_REQUEST, 'Invalid page size'),
      );
    }

    const { entities, totalPages } = Pagination.paginate(
      pageNumber,
      pageSize,
      countries,
    );

    if (pageNumber > totalPages) {
      this.logger.warn('Invalid page number');
      return Result.failure(
        new HttpError(HttpStatus.BAD_REQUEST, 'Invalid page number'),
      );
    }

    const response = new FoundCountriesDto(entities, totalPages);
    this.logger.log(`Successfully fetched countries - Page: ${pageNumber}`);

    return Result.success(response);
  }

  async getCountryInfo(
    getCountryInfoDto: GetCountryInfoDto,
  ): Promise<Result<CountryInfoDto | HttpError>> {
    const { countryCode } = getCountryInfoDto;

    this.logger.log(`Fetching info for country code: ${countryCode}`);

    const bordersResult =
      await this.dataFetcher.fetchCountryNameAndBorders(countryCode);
    if (!bordersResult.isSuccess) {
      return Result.failure(bordersResult.error);
    }

    const countryNameAndBorders = bordersResult.value as ICountryNameAndBorders;

    const [populationResult, flagResult] = await Promise.all([
      this.dataFetcher.fetchHistoricalPopulation(
        countryNameAndBorders.commonName,
      ),
      this.dataFetcher.fetchCountryFlag(countryCode),
    ]);

    if (!populationResult.isSuccess) {
      return Result.failure(populationResult.error);
    }

    if (!flagResult.isSuccess) {
      return Result.failure(flagResult.error);
    }

    const historicalPopulation =
      populationResult.value as ICountryHistoricalPopulation;
    const countryFlag = flagResult.value as ICountryFlag;

    if (
      !countryNameAndBorders.borders ||
      !Array.isArray(countryNameAndBorders.borders) ||
      countryNameAndBorders.borders.length === 0
    ) {
      this.logger.warn('Invalid borders data received');
      return Result.failure(
        new HttpError(HttpStatus.BAD_REQUEST, 'Invalid borders data received'),
      );
    }

    const countryFlagUrl = countryFlag.data.flag;

    if (!countryFlagUrl) {
      this.logger.warn('Invalid flag data received');
      return Result.failure(
        new HttpError(HttpStatus.BAD_REQUEST, 'Invalid flag data received'),
      );
    }

    const countryInfo: CountryInfoDto = {
      borderCountries: countryNameAndBorders.borders.map(
        (border) => new CountryDto(border.countryCode, border.commonName),
      ),
      flagUrl: countryFlagUrl,
      name: countryNameAndBorders.commonName,
      populationOverTime: historicalPopulation.data.populationCounts.map(
        (pop) => ({
          year: pop.year,
          population: pop.value,
        }),
      ),
    };

    this.logger.log(`Successfully fetched info for ${countryCode}`);

    return Result.success(countryInfo);
  }
}
