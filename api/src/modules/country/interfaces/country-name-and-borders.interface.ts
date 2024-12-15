export interface ICountryNameAndBorders {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: BorderCountry[];
}

type BorderCountry = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders?: ICountryNameAndBorders;
};
