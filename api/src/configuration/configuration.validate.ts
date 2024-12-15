import * as Joi from 'joi';

export const configurationValidate = Joi.object({
  PORT: Joi.number().required(),
  COUNTRY_LIST_AND_BORDERS_API_URL: Joi.string().required(),
  COUNTRY_INFO_API_URL: Joi.string().required(),
});
