import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IInputData } from '../components/NotesForm/NotesForm';
import { INoteData } from '../components/Note/Note';
import { ITagData } from '../components/TagsList/TagsList';

export const getData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Sorry, something went wrong...');
    }
    return await response.json();

  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
  }
}

export const getNotes = createAsyncThunk(
  'notes/getNotes',
  async () => {
    try {
        const response = await fetch('http://localhost:3000/notes/');
        if (!response.ok) {
          throw new Error('Sorry, nothing found');
      }
        const data = await response.json();
        return {
          notes: data,
      };
    } catch (err: unknown) {
        if (err instanceof Error) {
          return err.message;
        }
    }
  }
);

export const postData = async (url: string, data: IInputData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Sorry, something went wrong...');
    }
    return await response.json();

  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
  }
}

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (text: string) => {
    return await postData('http://localhost:3000/notes/', {text});
  }
)

export const deleteData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
      },
      body: null,
    });
    if (!response.ok) {
      throw new Error('Sorry, something went wrong...');
    }
    return await response.json();

  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
  }
}

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: number) => {
    await deleteData(`http://localhost:3000/notes/${id}`);
    return await getData(`http://localhost:3000/notes/`);
  }
)

const updateData = async (url: string, data: IInputData) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Sorry, something went wrong...');
    }
    return await response.json();

  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
  }
}

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({id, text}: {id: number, text: string}) => {
    await updateData(`http://localhost:3000/notes/${id}`, {text});
    return await getData(`http://localhost:3000/notes/`);
  }
)

export const searchNote = createAsyncThunk(
  'notes/searchNote',
  async function ( searchValue: string, { rejectWithValue }) {
    try {
      const url = `http://localhost:3000/notes/?text=${searchValue.trim()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Sorry, nothing found');
      }
      const data = await response.json();
      return {
        notes: data,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);


const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: [] as INoteData[],
    filteredNotes:  [] as INoteData[],
    isFilter: false,
    tags: [] as ITagData[],
  },
  reducers: {
    filterNotesByTag(state, action) {
      state.filteredNotes = state.notes.filter(note => note.text.search(action.payload) !== -1)
    }
  },
  extraReducers: {
    [getNotes.fulfilled.toString()]: (state, action) => {
      state.notes = action.payload.notes;
    },
    [createNote.fulfilled.toString()]: (state, action) => {
      state.notes.push(action.payload);
    },
    [deleteNote.fulfilled.toString()]: (state, action) => {
      state.notes = action.payload;
    },
    [updateNote.fulfilled.toString()]: (state, action) => {
      state.notes = action.payload;
    },
    [searchNote.fulfilled.toString()]: (state, action) => {
      state.notes = action.payload.notes;
    },
  },
})

export const { filterNotesByTag } = noteSlice.actions;

export default noteSlice.reducer;
