// @ts-nocheck
import client from '@/apollo/client';
import {
  AggregateCartItemDocument,
  AggregateCartItemQuery,
  Cart,
  CartDocument,
  CartQuery,
  MeDocument,
  MeQuery,
} from '@/graphql/generated/schema';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  cartItemCount: 0,
  cart: {} as Cart,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch cart item count from API (e.g., on page reload)
export const fetchCartItemCount = createAsyncThunk(
  'cart/fetchCartItemCount',
  async (_, { getState }) => {
    const state = (getState() as any).cart;
    console.log(state);

    const { data }: { data: AggregateCartItemQuery } = await client.query({
      query: AggregateCartItemDocument,
      variables: {
        where: {
          cartId: {
            equals: state?.cart?.id,
          },
        },
      },
      fetchPolicy: 'network-only',
    });
    // const {data:cartData}:{data:}
    console.log(data);

    // const response = await axios.get("/api/cart/count");
    return data.aggregateCartItem._sum?.quantity ?? 0; // assuming API returns { count: number }
  },
);

export const fetchCartOfTheUser = createAsyncThunk(
  'cart/fetchCartOfTheUser',
  async (_, { getState }) => {
    const state = getState();
    const { data }: { data: CartQuery } = await client.query({
      query: CartDocument,
      variables: {
        where: { userId: state?.auth?.user?.id },
      },
    });
    const cart = data?.cart ?? {};
    // const {data:cartData}:{data:}

    // const response = await axios.get("/api/cart/count");
    return cart; // assuming API returns { count: number }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
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
      }),
      builder
        .addCase(fetchCartOfTheUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCartOfTheUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.cart = action.payload;
        })
        .addCase(fetchCartOfTheUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
  },
});

export default cartSlice.reducer;
