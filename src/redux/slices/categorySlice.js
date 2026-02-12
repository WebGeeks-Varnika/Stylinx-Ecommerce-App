import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoriesAPI } from "../../services/api";  
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCategoriesAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: builder => {
    builder
     .addCase(fetchCategories.pending, state => {
  state.loading = true;
  state.error = null;
})


      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
