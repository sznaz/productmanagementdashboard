import Responses from "../../config/responses";
import { ICreateProductPayload, IResponse } from "../../types";
import { IProductModel } from "../models/product.model";
import ProductQueries from "../queries/product.queries";

const productQueries = new ProductQueries()
class ProductService {

  public createProduct = async (payload: ICreateProductPayload): Promise<IResponse<IProductModel>> => {
    const products: IProductModel = await productQueries.create(payload)
    return Responses.ok(products);
  };
  public updateProduct = async (payload: Partial<ICreateProductPayload>, id: string): Promise<IResponse<IProductModel>> => {
    const product: IProductModel = await productQueries.update(payload, id) as IProductModel
    return Responses.ok(product);
  };
  public deleteProduct = async (id: string): Promise<IResponse<IProductModel>> => {
    const product: IProductModel = await productQueries.deleteProduct(id)
    return Responses.ok(product);
  };
  public getProducts = async ( page: number, limit: number): Promise<IResponse<any>> => {
    const products: any = await productQueries.getAllProducts(page,limit)
    return Responses.ok(products);
  };
  public getProductById = async (id: string): Promise<IResponse<IProductModel>> => {
    const products: IProductModel = await productQueries.getProductById(id)
    return Responses.ok(products);
  };
}

export default ProductService;