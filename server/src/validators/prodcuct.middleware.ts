import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(50, "Product name cannot exceed 50 characters"),
  category: z.string(),
  price: z.number().min(0, "Product price must be greater than zero"),
  inStock: z.number(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
