import { Router } from "express";
import ProductService from "../service/product.service";

const router = Router();
const productService = new ProductService()

router.get("/all", async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const response = await productService.getProducts(page, limit);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await productService.getProductById(id);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body)
    const response = await productService.createProduct(body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const response = await productService.updateProduct(body, id);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await productService.deleteProduct(id);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;