export const configuration = () => ({
  server: {
    port: Number(process.env.PORT) || 3001,
    countryListAndBordersApiUrl: process.env.COUNTRY_LIST_AND_BORDERS_API_URL,
    countryInfoApiUrl: process.env.COUNTRY_INFO_API_URL,
  },
});
