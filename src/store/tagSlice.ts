import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { deleteData, getData, postData } from './noteSlice';
import { ITagData } from '../components/TagsList/TagsList';


export const createTag = createAsyncThunk(
  'tags/createTag',
  async (text: string) => {
    return await postData('http://localhost:3000/tags/', {text});
  }
)

export const getTags = createAsyncThunk(
  'tags/getTags',
  async () => {
    try {
      const response = await fetch('http://localhost:3000/tags/');
      if (!response.ok) {
        throw new Error('Sorry, nothing found');
      }
      const data = await response.json();
      return {
        tags: data,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }
);

export const deleteTag = createAsyncThunk(
  'tags/deleteTag',
  async (id: number) => {
    await deleteData(`http://localhost:3000/tags/${id}`);
    return await getData(`http://localhost:3000/tags/`);
  }
)

const tagSlice = createSlice({
  name: 'note',
  initialState: {
    tags: [] as ITagData[],
  },
  reducers: {

  },
  extraReducers: {
    [getTags.fulfilled.toString()]: (state, action) => {
      state.tags = action.payload.tags;
    },
    [createTag.fulfilled.toString()]: (state, action) => {
      state.tags.push(action.payload);
    },
    [deleteTag.fulfilled.toString()]: (state, action) => {
      state.tags = action.payload;
    },
  }
})

export default tagSlice.reducer;
