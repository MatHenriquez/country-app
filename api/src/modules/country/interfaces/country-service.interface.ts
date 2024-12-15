import { Result } from 'src/modules/utils/result/result';
import { GetCountriesDto } from '../dto/request/get-countries.dto';
import { FoundCountriesDto } from '../dto/response/found-countries.dto';
import HttpError from 'src/modules/utils/error/http-error';
import { GetCountryInfoDto } from '../dto/request/get-country-info.dto';
import { CountryInfoDto } from '../dto/response/country-info.dto';

export const COUNTRY_SERVICE = 'COUNTRY_SERVICE';

export interface ICountryService {
  getCountries(
    getCountryDto: GetCountriesDto,
  ): Promise<Result<FoundCountriesDto | HttpError>>;

  getCountryInfo(
    getCountryInfoDto: GetCountryInfoDto,
  ): Promise<Result<CountryInfoDto | HttpError>>;
}
