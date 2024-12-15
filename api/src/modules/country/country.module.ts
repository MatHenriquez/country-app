import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { COUNTRY_SERVICE } from './interfaces/country-service.interface';
import { CountryService } from './country.service';
import { HttpModule } from '@nestjs/axios';
import { CountryDataFetcher } from './helpers/country-data-fetcher.service';

@Module({
  imports: [HttpModule],
  controllers: [CountryController],
  providers: [
    CountryDataFetcher,
    {
      provide: COUNTRY_SERVICE,
      useClass: CountryService,
    },
  ],
})
export class CountryModule {}
