import Responses from "../../config/responses";
import { ICreateCategoryPayload, IResponse } from "../../types";
import { ICategoryModel } from "../models/category.model";
import CategoryQueries from "../queries/category.queries";

const categoryQueries = new CategoryQueries()
class CategoryService {

  public createCategory = async (payload: ICreateCategoryPayload): Promise<IResponse<ICategoryModel>> => {
    const categorys: ICategoryModel = await categoryQueries.create(payload)
    return Responses.ok(categorys);
  };
  public updateCategory = async (payload: Partial<ICreateCategoryPayload>, id: string): Promise<IResponse<ICategoryModel>> => {
    const category: ICategoryModel = await categoryQueries.update(payload, id) as ICategoryModel
    return Responses.ok(category);
  };
  public deleteCategory = async (id: string): Promise<IResponse<ICategoryModel>> => {
    const category: ICategoryModel = await categoryQueries.deleteCategory(id)
    return Responses.ok(category);
  };
  public getCategorys = async (): Promise<IResponse<ICategoryModel[]>> => {
    const categorys: ICategoryModel[] = await categoryQueries.getAllCategorys()
    return Responses.ok(categorys);
  };
  public getCategoryById = async (id: string): Promise<IResponse<ICategoryModel>> => {
    const categorys: ICategoryModel = await categoryQueries.getCategoryById(id)
    return Responses.ok(categorys);
  };
}

export default CategoryService;