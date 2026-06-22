export interface IResponse<T = unknown> {
  error: boolean;
  statusCode: number;
  data?: T;
  message: string;
}
export interface ICreateProductPayload {
  name: string;
  price: number;
  category: string;
  inStock: number;
}
export interface ICreateCategoryPayload {
  name: string;
}

