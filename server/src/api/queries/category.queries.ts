import { ICreateCategoryPayload } from "../../types";
import categoryModel, { ICategoryModel } from "../models/category.model";

class CategoryQueries {
  public create = async (
    payload: ICreateCategoryPayload
  ): Promise<ICategoryModel> => {
    return categoryModel.create(payload);
  };
  public update = async (
    payload: Partial<ICreateCategoryPayload>,
    id: string
  ): Promise<ICategoryModel> => {
    const category = await categoryModel.findByIdAndUpdate(id, payload);
    return category as ICategoryModel;
  };

  public getAllCategorys = async (): Promise<ICategoryModel[]> => {
    const categorys = await categoryModel.find().lean().exec();
    return categorys;
  };

  public getCategoryById = async (id: string): Promise<ICategoryModel> => {
    const categorys = await categoryModel.findById(id).lean().exec();
    return categorys as ICategoryModel;
  };
  public deleteCategory = async (id: string): Promise<ICategoryModel> => {
    return (await categoryModel
      .findByIdAndDelete(id)
      .lean()
      .exec()) as ICategoryModel;
  };
}

export default CategoryQueries;
