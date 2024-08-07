import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  createCommentService,
  createPostService,
  deleteCommentService,
  deletePostService,
  fetchCommentsService,
  fetchPostsService,
  updateCommentService,
  updatePostService,
} from '../shared/api/feed/feedServices';
import {CommentType, PostType} from '../shared/types/common-types';

type FeedState = {
  posts: PostType[];
  comments: {[key: number]: CommentType[]};
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
};

const initialState: FeedState = {
  posts: [],
  comments: {},
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchPostsRedux = createAsyncThunk(
  'feed/fetchPosts',
  async (_, {rejectWithValue}) => {
    try {
      const posts = await fetchPostsService();
      return posts;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить посты.');
    }
  },
);

export const createPostRedux = createAsyncThunk(
  'feed/createPost',
  async (newPost: PostType, {rejectWithValue}) => {
    try {
      const post = await createPostService(newPost);
      return post;
    } catch (error) {
      return rejectWithValue('Не удалось создать пост.');
    }
  },
);

export const updatePostRedux = createAsyncThunk(
  'feed/updatePost',
  async (updatedPost: PostType, {rejectWithValue}) => {
    try {
      const post = await updatePostService(updatedPost.id, updatedPost);
      return post;
    } catch (error) {
      return rejectWithValue('Не удалось обновить пост.');
    }
  },
);

export const deletePostRedux = createAsyncThunk(
  'feed/deletePost',
  async (postId: number, {rejectWithValue}) => {
    try {
      await deletePostService(postId);
      return postId;
    } catch (error) {
      return rejectWithValue('Не удалось удалить пост.');
    }
  },
);

export const fetchCommentsRedux = createAsyncThunk(
  'feed/fetchComments',
  async (postId: number, {rejectWithValue}) => {
    try {
      const comments = await fetchCommentsService(postId);
      return {postId, comments};
    } catch (error) {
      return rejectWithValue('Не удалось загрузить комментарии.');
    }
  },
);

export const createCommentRedux = createAsyncThunk(
  'feed/createComment',
  async ({postId, text}: {postId: number; text: string}, {rejectWithValue}) => {
    try {
      const comment = await createCommentService(postId, {text});
      return comment;
    } catch (error) {
      return rejectWithValue('Не удалось создать комментарий.');
    }
  },
);

export const updateCommentRedux = createAsyncThunk(
  'feed/updateComment',
  async (
    {commentId, text}: {commentId: number; postId: number; text: string},
    {rejectWithValue},
  ) => {
    try {
      const comment = await updateCommentService(commentId, {text});
      return comment;
    } catch (error) {
      return rejectWithValue('Не удалось обновить комментарий.');
    }
  },
);

export const deleteCommentRedux = createAsyncThunk(
  'feed/deleteComment',
  async (
    {commentId, postId}: {commentId: number; postId: number},
    {rejectWithValue},
  ) => {
    try {
      await deleteCommentService(commentId);
      return {commentId, postId};
    } catch (error) {
      return rejectWithValue('Не удалось удалить комментарий.');
    }
  },
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsRedux.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsRedux.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPostRedux.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPostRedux.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPostRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePostRedux.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePostRedux.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          post => post.id === action.payload.id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePostRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePostRedux.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePostRedux.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePostRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCommentsRedux.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsRedux.fulfilled, (state, action) => {
        state.loading = false;
        const {postId, comments} = action.payload;
        state.comments[postId] = comments;
      })
      .addCase(fetchCommentsRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCommentRedux.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCommentRedux.fulfilled, (state, action) => {
        state.loading = false;
        const {postId} = action.payload;
        if (state.comments[postId]) {
          state.comments[postId].push(action.payload);
        } else {
          state.comments[postId] = [action.payload];
        }
      })
      .addCase(createCommentRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCommentRedux.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCommentRedux.fulfilled, (state, action) => {
        state.loading = false;
        const {id, postId} = action.payload;
        const comments = state.comments[postId] || [];
        const index = comments.findIndex(comment => comment.id === id);
        if (index !== -1) {
          comments[index] = action.payload;
        }
      })
      .addCase(updateCommentRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCommentRedux.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCommentRedux.fulfilled, (state, action) => {
        state.loading = false;
        const {commentId, postId} = action.payload;
        if (state.comments[postId]) {
          state.comments[postId] = state.comments[postId].filter(
            comment => comment.id !== commentId,
          );
        }
      })
      .addCase(deleteCommentRedux.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {resetError} = feedSlice.actions;
export default feedSlice.reducer;
