import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsAPI ,searchProductsAPI,
  filterByCategoryAPI,
  filterByPriceRangeAPI,filterByPriceAPI} from '../../services/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return await fetchProductsAPI();
  }
);
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (title, { rejectWithValue }) => {
    try {
      const data = await searchProductsAPI(title);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const filterProductsByCategory = createAsyncThunk(
  "products/filterByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const data = await filterByCategoryAPI(categoryId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const filterProductsByPrice = createAsyncThunk(
  "products/filterByPrice",
  async (price, { rejectWithValue }) => {
    try {
      const data = await filterByPriceAPI(price);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const filterProductsByPriceRange = createAsyncThunk(
  "products/filterByPriceRange",
  async ({ min, max }, { rejectWithValue }) => {
    try {
      const data = await filterByPriceRangeAPI(min, max);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
  state.products = action.payload;
})
.addCase(filterProductsByCategory.fulfilled, (state, action) => {
  state.products = action.payload;
})
.addCase(filterProductsByPrice.fulfilled, (state, action) => {
  state.products = action.payload;
})
.addCase(filterProductsByPriceRange.fulfilled, (state, action) => {
  state.products = action.payload;
})

  },
});

export default productSlice.reducer;
