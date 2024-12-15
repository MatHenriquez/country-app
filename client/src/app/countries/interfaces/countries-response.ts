export interface ICountriesResponse {
  countries: ICountryBasicInfo[];
  totalPages: number;
}

export interface ICountryBasicInfo {
  name: string;
  countryCode: string;
}
