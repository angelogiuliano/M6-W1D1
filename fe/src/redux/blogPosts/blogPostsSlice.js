import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../client/client";

const client = new AxiosClient();

const initialState = {
  blogPosts: [],
  isLoading: false,
  error: null,
};

export const getAllBlogPosts = createAsyncThunk(
  "blogPosts/GETBlogPosts",
  async () => {
    const response = await client.get(`/getAuthors`)
    return response.json();
  }
);

const blogPostsSlice = createSlice({
  name: "blogPosts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.blogPosts = action.payload;
      })
      .addCase(getAllBlogPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Oops, please try again later";
      });
  },
});

export const allBlogPosts = (state) => state.postsData.blogPosts;
export const isAllPostsLoading = (state) => state.postsData.isLoading;
export const isAllPostsError = (state) => state.postsData.error;
export default blogPostsSlice.reducer;
