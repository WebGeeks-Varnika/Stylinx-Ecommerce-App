import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProductsAPI = async () => {
  try {
    const res = await api.get("/products");
    console.log("All Products :::", res.data);
    return res.data;
  } catch (error) {
    console.log("fetchProductsAPI Error:", error);
    throw error;
  }
};


export const fetchProductByIdAPI = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    console.log("Product By ID :::", res.data);
    return res.data;
  } catch (error) {
    console.log("fetchProductByIdAPI Error:", error);
    throw error;
  }
};

export const searchProductsAPI = async (title) => {
  try {
    const res = await api.get(`/products?title=${title}`);
    return res.data;
  } catch (error) {
    console.log("searchProductsAPI Error:", error);
    throw error;
  }
};

export const filterByPriceAPI = async (price) => {
  try {
    const res = await api.get(`/products?price=${price}`);
    return res.data;
  } catch (error) {
    console.log("filterByPriceAPI Error:", error);
    throw error;
  }
};


export const filterByPriceRangeAPI = async (min, max) => {
  try {
    const res = await api.get(
      `/products?price_min=${min}&price_max=${max}`
    );
    return res.data;
  } catch (error) {
    console.log("filterByPriceRangeAPI Error:", error);
    throw error;
  }
};

export const filterByCategoryAPI = async (categoryId) => {
  try {
    const res = await api.get(
      `/products?categoryId=${categoryId}`
    );
    return res.data;
  } catch (error) {
    console.log("filterByCategoryAPI Error:", error);
    throw error;
  }
};

export const fetchCategoriesAPI = async () => {
  try {
    const res = await api.get("/categories");
    console.log("fetch cattegory",res)
    return res.data;
  } catch (error) {
    console.log("fetchCategoriesAPI Error:", error);
    throw error;
  }
};

export const fetchCategoryByIdAPI = async (id) => {
  try {
    const res = await api.get(`/categories/${id}`);
    return res.data;
  } catch (error) {
    console.log("fetchCategoryByIdAPI Error:", error);
    throw error;
  }
};
