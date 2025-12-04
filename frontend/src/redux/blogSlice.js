import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

export const fetchBlogs = createAsyncThunk('blogs/fetchAll', async () => {
  const blogs = await blogService.getAll();
  return blogs.sort((a, b) => b.likes - a.likes);
});

export const createBlog = createAsyncThunk('blogs/create', async (blog) => {
  const newBlog = await blogService.create(blog);
  return newBlog;
});

export const deleteBlog = createAsyncThunk('blogs/delete', async (id) => {
  await blogService.remove(id);
  return id;
});

export const updateLikes = createAsyncThunk('blogs/updateLikes', async (blog) => {
  const updated = await blogService.updateLikes(blog.id, blog.likes + 1);
  return updated;
});

export const addComment = createAsyncThunk('blogs/addComment', async ({ blogId, comment }) => {
  const updatedBlog = await blogService.addComment(blogId, comment);
  return updatedBlog;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    items: [],
    commentDraft: '',
  },
  reducers: {
    setCommentDraft(state, action) {
      state.commentDraft = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateLikes.fulfilled, (state, action) => {
        state.items = state.items.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter((blog) => blog.id !== action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items = state.items.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );
        state.commentDraft = '';
      });
  },
});

export const { setCommentDraft } = blogSlice.actions;
export default blogSlice.reducer;
