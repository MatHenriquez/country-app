import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CountryDto } from '../dto/response/country.dto';
import { Result } from '@/modules/utils/result/result';
import HttpError from '@/modules/utils/error/http-error';
import { ICountryNameAndBorders } from '../interfaces/country-name-and-borders.interface';
import { ICountryHistoricalPopulation } from '../interfaces/country-historical-population.interface';
import { ICountryFlag } from '../interfaces/country-flag.interface';
import { configuration } from '@/configuration/configuration';

@Injectable()
export class CountryDataFetcher {
  private readonly logger = new Logger(CountryDataFetcher.name);

  constructor(private readonly httpService: HttpService) {}

  async fetchAllCountries(): Promise<Result<CountryDto[] | HttpError>> {
    const url = `${configuration().server.countryListAndBordersApiUrl}/AvailableCountries`;
    try {
      const response = await firstValueFrom(
        this.httpService.get<CountryDto[]>(url),
      );
      return Result.success(response.data);
    } catch (error) {
      this.logger.error('Failed to fetch all countries:', error);
      return Result.failure(
        new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Failed to fetch all countries',
        ),
      );
    }
  }

  async fetchCountryNameAndBorders(
    countryCode: string,
  ): Promise<Result<ICountryNameAndBorders | HttpError>> {
    const url = `${configuration().server.countryListAndBordersApiUrl}/CountryInfo/${countryCode}`;
    try {
      const response = await firstValueFrom(
        this.httpService.get<ICountryNameAndBorders>(url),
      );
      return Result.success(response.data);
    } catch (error) {
      this.logger.error(
        `Failed to fetch country name and borders for ${countryCode}:`,
        error,
      );
      return Result.failure(
        new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Failed to fetch country name and borders',
        ),
      );
    }
  }

  async fetchHistoricalPopulation(
    countryName: string,
  ): Promise<Result<ICountryHistoricalPopulation | HttpError>> {
    const url = `${configuration().server.countryInfoApiUrl}/population`;
    try {
      const response = await firstValueFrom(
        this.httpService.post<ICountryHistoricalPopulation>(
          url,
          { country: countryName.toLowerCase() },
          { headers: { 'Content-Type': 'application/json' } },
        ),
      );
      return Result.success(response.data);
    } catch (error) {
      this.logger.error(
        `Failed to fetch historical population for ${countryName}:`,
        error,
      );
      return Result.failure(
        new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Failed to fetch historical population',
        ),
      );
    }
  }

  async fetchCountryFlag(
    iso2: string,
  ): Promise<Result<ICountryFlag | HttpError>> {
    const url = `${configuration().server.countryInfoApiUrl}/flag/images`;
    try {
      const response = await firstValueFrom(
        this.httpService.post<ICountryFlag>(
          url,
          { iso2 },
          { headers: { 'Content-Type': 'application/json' } },
        ),
      );
      return Result.success(response.data);
    } catch (error) {
      this.logger.error(`Failed to fetch country flag for ${iso2}:`, error);
      return Result.failure(
        new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Failed to fetch country flag',
        ),
      );
    }
  }
}
