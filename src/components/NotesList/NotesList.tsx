import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import Note, {INoteData} from '../Note/Note';

const NotesList = () => {
  let notes = useSelector<RootState>((state) => state.notes.notes) as INoteData[];
  let filteredNotes = useSelector<RootState>((state) => state.notes.filteredNotes) as INoteData[];

  if (filteredNotes.length > 0) {
    notes = filteredNotes;
  }

  return(
    <div className="notes-list">
      {
        notes.map(note => {
          return (
            <Note
              key={note.id}
              text={note.text}
              id={note.id}
            />
          )
        })
      }
    </div>
  )
}
export default NotesList;
