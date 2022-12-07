import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import NotesForm from './components/NotesForm/NotesForm';
import NotesList from './components/NotesList/NotesList';
import Search from './components/Search/Search';
import TagsList from './components/TagsList/TagsList';
import { AppDispatch } from './store/store';
import { getNotes, searchNote } from './store/noteSlice';
import { getTags } from './store/tagSlice';

import './App.scss';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNotes());
    dispatch(getTags());
  }, [dispatch]);

  return (
    <div className="App">
      <header>
        <h1>
          Notes Editor
        </h1>
      </header>
      <NotesForm />
      <Search handleSearchNote={searchNote} />
      <TagsList />
      <NotesList />
    </div>
  );
}

export default App;
