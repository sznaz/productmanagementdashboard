import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import "./NewProduct.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export interface ICreateProduct {
  name: string;
  category: string;
  price: string;
  inStock: string;
}
export interface Category {
  name: string;
  _id?: string;
}
const NewProduct = () => {
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = id ? true : false;
  const initialFormData: ICreateProduct = {
    name: "",
    category: "",
    price: "",
    inStock: "",
  };

  const [formData, setFormData] = useState<ICreateProduct>(initialFormData);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ICreateProduct, string>>
  >({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ICreateProduct, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (Number(formData.inStock) < 0) {
      newErrors.inStock = "Stock cannot be negative";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const createProduct = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${baseUrl}/product`, {
        ...formData,
        price: Number(formData.price),
        inStock: Number(formData.inStock),
      });

      if (response.status === 200) {
        setMessage("Product Created");
        setOpen(true);

        setFormData(initialFormData);
        setErrors({});
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(`${baseUrl}/product/${id}`, {
        ...formData,
        price: Number(formData.price),
        inStock: Number(formData.inStock),
      });

      if (response.status === 200) {
        setMessage("Product updated Created");
        setOpen(true);

        setFormData(initialFormData);
        setErrors({});
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/category/all`);
        setCategories(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
  }, [baseUrl]);

  useEffect(() => {
    const getProductById = async (productid: string) => {
      try {
        const response = await axios.get(`${baseUrl}/product/${productid}`);

        if (response.status === 200) {
          const prod = response.data.data;
          setFormData({
            name: prod.name,
            category: prod.category,
            price: String(prod.price),
            inStock: String(prod.inStock),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isEdit && id) {
      getProductById(id);
    }
  }, [id, isEdit]);
  return (
    <div>
      <Box sx={{ mb: 2, px: 5 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: "#4a1655",
            fontWeight: 600,
          }}
        >
          Go Back
        </Button>
      </Box>
      <form className="form">
        <Box>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.category}>
            <InputLabel>Category</InputLabel>

            <Select
              name="category"
              value={formData.category}
              label="Category"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }));

                setErrors((prev) => ({
                  ...prev,
                  category: "",
                }));
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>

            {errors.category && (
              <Box
                sx={{
                  color: "error.main",
                  fontSize: "0.75rem",
                  mt: 0.5,
                  ml: 1.5,
                }}
              >
                {errors.category}
              </Box>
            )}
          </FormControl>

          <TextField
            sx={{ width: "100%", mb: 2 }}
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
          />

          <TextField
            sx={{ width: "100%", mb: 2 }}
            name="inStock"
            label="In Stock"
            type="number"
            value={formData.inStock}
            onChange={handleChange}
            error={!!errors.inStock}
            helperText={errors.inStock}
          />
        </Box>

        <Button
          sx={{ backgroundColor: "#4a1655", color: "white" }}
          onClick={isEdit ? updateProduct : createProduct}
        >
          {isEdit ? "Update" : "Create"}
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </div>
  );
};

export default NewProduct;
