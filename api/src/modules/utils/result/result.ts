import HttpError from '../error/http-error';

export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly value?: T;
  public readonly error?: HttpError;

  private constructor(isSuccess: boolean, value?: T, error?: HttpError) {
    this.isSuccess = isSuccess;
    this.value = value;
    this.error = error;
  }

  public static success<T>(value: T): Result<T> {
    return new Result<T>(true, value);
  }

  public static failure<T>(error: HttpError): Result<T> {
    return new Result<T>(false, undefined, error);
  }
}
