import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Category } from "../NewProduct/NewProduct";
import { Box, Button, TablePagination, TextField, Typography } from "@mui/material";

export interface Product {
  name: string;
  _id?: string;
  category: string | Category;
  price: number;
  inStock: number;
}

export default function Products() {
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/product/all`, {
          params: {
            page,
            limit: rowsPerPage,
          },
        });
        setTotal(data.data.total);
        setProducts(data.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage]);

  const filteredProducts = products?.filter((product) =>
    product?.name?.toLowerCase().includes(search.toLowerCase())
  );
  const refreshProducts = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/product/all`);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${baseUrl}/product/${id}`);
      if (res.status === 200) {
        refreshProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <Box sx={{ px: "40px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Products</Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/new")}
          sx={{
            backgroundColor: "#4a1655",
          }}
        >
          Add Product
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          size="small"
          label="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f2ebf3" }}>
              <TableCell>Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">
                    {(row.category as Category)?.name}
                  </TableCell>
                  <TableCell align="right">{row.inStock}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon
                      color="error"
                      onClick={() => row._id && handleDelete(row._id)}
                      sx={{ cursor: "pointer" }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <EditIcon
                      color="secondary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => row._id && handleEdit(row._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => {
          setPage(newPage + 1);
        }}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(1);
        }}
        rowsPerPageOptions={[1, 10, 25, 50]}
      />
    </Box>
  );
}
