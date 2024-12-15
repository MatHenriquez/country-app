import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../app.module';

describe('Countries - [/country]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /country', () => {
    it('should return paginated countries if valid GetCountriesDto', async () => {
      const response = await request(app.getHttpServer())
        .get('/country')
        .query({ pageNumber: 1, pageSize: 3 });

      const expectedResponse = {
        countries: [
          {
            countryCode: 'AD',
            name: 'Andorra',
          },
          {
            countryCode: 'AL',
            name: 'Albania',
          },
          {
            countryCode: 'AM',
            name: 'Armenia',
          },
        ],
        totalPages: 38,
      };

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(expectedResponse);
    });

    it('should return 400 if invalid page size', async () => {
      await request(app.getHttpServer())
        .get('/country')
        .query({ pageNumber: 1, pageSize: 300 })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 if invalid page number', async () => {
      await request(app.getHttpServer())
        .get('/country')
        .query({ pageNumber: 100, pageSize: 10 })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 if invalid page number and page size', async () => {
      await request(app.getHttpServer())
        .get('/country')
        .query({ pageNumber: 100, pageSize: 300 })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 if there are any extra query params', async () => {
      await request(app.getHttpServer())
        .get('/country')
        .query({ pageNumber: 1, pageSize: 10, extraParam: 'extra' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('GET /country/:countryCode', () => {
    it('should return country info if valid countryCode', async () => {
      const response = await request(app.getHttpServer()).get('/country/AD');

      const expectedResponse = {
        name: 'Andorra',
        populationOverTime: expect.any(Array),
        flagUrl:
          'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg',
        borderCountries: expect.any(Array),
      };

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toStrictEqual(expectedResponse);
    });

    it('should return 500 if invalid countryCode', async () => {
      await request(app.getHttpServer())
        .get('/country/23')
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});
