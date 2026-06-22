import { Router } from "express";
import CategoryService from "../service/category.service";
import { validate } from "../../middlewares/validate.middleware";
import { createCategorySchema, updateCategorySchema } from "../../validators/category.validator";

const router = Router();
const categoryService = new CategoryService();

router.get("/all", async (req, res, next) => {
  try {
    const response = await categoryService.getCategorys();
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await categoryService.getCategoryById(id);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", validate(createCategorySchema), async (req, res, next) => {
  try {
    const body = req.body;
    const response = await categoryService.createCategory(body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", validate(updateCategorySchema), async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const response = await categoryService.updateCategory(body, id as string);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await categoryService.deleteCategory(id);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
