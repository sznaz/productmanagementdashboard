import { ICreateProductPayload } from "../../types";
import productModel, { IProductModel } from "../models/product.model";

class ProductQueries {
  public create = async (
    payload: ICreateProductPayload
  ): Promise<IProductModel> => {
    return productModel.create(payload);
  };
  public update = async (
    payload: Partial<ICreateProductPayload>,
    id: string
  ): Promise<IProductModel> => {
    const product = await productModel.findByIdAndUpdate(id, payload);
    return product as IProductModel;
  };

  public getAllProducts = async (
    page: number,
    limit: number
  ): Promise<any> => {
    const total = await productModel.countDocuments();
    const products = await productModel
      .find()
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();
    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  };

  public getProductById = async (id: string): Promise<IProductModel> => {
    const products = await productModel.findById(id).lean().exec();
    return products as IProductModel;
  };
  public deleteProduct = async (id: string): Promise<IProductModel> => {
    return (await productModel
      .findByIdAndDelete(id)
      .lean()
      .exec()) as IProductModel;
  };
}

export default ProductQueries;
