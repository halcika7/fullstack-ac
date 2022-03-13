import { Response } from 'express';

export interface IJSONBuilder<T> {
  setData(data: T): this;

  build(): Response;

  setResponseStatus(status: number): this;
}

export class JSONResponse<T> {
  private result?: T;

  set Result(result: T | undefined) {
    this.result = result;
  }

  get Result(): T | undefined {
    return this.result;
  }
}

export class ResponseBuilder<T> implements IJSONBuilder<T> {
  private responseObject: JSONResponse<T>;

  constructor(private readonly response: Response) {
    this.responseObject = new JSONResponse<T>();
  }

  setData(data: T) {
    this.responseObject.Result = data;

    return this;
  }

  setResponseStatus(status: number) {
    this.response.status(status);

    return this;
  }

  build() {
    return this.response.json(this.responseObject);
  }
}
