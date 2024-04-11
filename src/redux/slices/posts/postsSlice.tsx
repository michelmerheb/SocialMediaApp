import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Post {
  id: string;
  title: string;
  content: string;
  date: Date;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: any;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

console.log('Loading PostsSlice.tsx');

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('https://6611611895fdb62f24ed0f74.mockapi.io/BlendIn/posts');
    return response.json();
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addPost, removePost } = postsSlice.actions;

export default postsSlice.reducer;
