import { IResponse } from "../types";

class Responses {
  public static ok<T>(data: T): IResponse<T> {
    return {
      error: false,
      statusCode: 200,
      data,
      message: "Success",
    };
  }

  public static notFound(message: string): IResponse<null> {
    return {
      error: true,
      statusCode: 404,
      message,
    };
  }

  public static serverError(message: string): IResponse<null> {
    return {
      error: true,
      statusCode: 500,
      message,
    };
  }
}

export default Responses;