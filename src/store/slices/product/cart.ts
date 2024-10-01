import client from "@/apollo/client";
import { MeDocument, MeQuery } from "@/graphql/generated/schema";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  cartItemCount: 0,
  cart:{},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch cart item count from API (e.g., on page reload)
export const fetchCartItemCount = createAsyncThunk(
  "cart/fetchCartItemCount",
  async (_, { getState }) => {
// const {data:cartData}:{data:}

    // const response = await axios.get("/api/cart/count");
    return 0; // assuming API returns { count: number }
  }
);

export const fetchCartOfTheUser = createAsyncThunk(
  "cart/fetchCartItemCount",
  async (_, { getState }) => {
const {data}:{data:MeQuery} = await client.query({query:MeDocument})
// const {data:cartData}:{data:}

    // const response = await axios.get("/api/cart/count");
    return 0; // assuming API returns { count: number }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchCartItemCount
    builder
      .addCase(fetchCartItemCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItemCount = action.payload;
      })
      .addCase(fetchCartItemCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      

  },
});

export default cartSlice.reducer;
