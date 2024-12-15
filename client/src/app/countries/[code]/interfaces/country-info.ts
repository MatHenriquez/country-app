import { ICountryBasicInfo } from "../../interfaces/countries-response";

export interface ICountryInfo {
  borderCountries: ICountryBasicInfo[];
  flagUrl: string;
  name: string;
  populationOverTime: IPopulationOverTime[];
}

interface IPopulationOverTime {
  year: number;
  population: number;
}
