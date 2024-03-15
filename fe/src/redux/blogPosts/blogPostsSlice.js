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
    return await client.get("/getAuthors");
  }
);

const blogPostsSlice = createSlice({
  name: "blogPosts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogPosts.pending, (state) => {
        state.isLoading = true;
        console.log(state);
      })
      .addCase(getAllBlogPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.blogPosts = action.payload;
        console.log(state);
      })
      .addCase(getAllBlogPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Oops, please try again later";
        console.log(state);
      });
  },
});

export const allBlogPosts = (state) => state.blogPostsData.blogPosts;
export default blogPostsSlice.reducer;
