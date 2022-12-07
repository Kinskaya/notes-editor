import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteNote, updateNote } from '../../store/noteSlice';
import { AppDispatch } from '../../store/store';

import { MdDeleteForever } from 'react-icons/md';

export interface INoteData {
  id: number;
  text: string;
}

type TNoteProps = {
  id: number,
  text: string,
}

const Note: React.FC<TNoteProps> = ({ id, text }) =>  {
  const dispatch = useDispatch<AppDispatch>();

  const [newText, setNewText] = useState(text);
  const [changedItem, setChangedItem] = useState<number | null>(null);

  const isChangedItem = changedItem === id;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(event.currentTarget.value);
  }
  const updateItem = () => {
    if (!isChangedItem) {
      setChangedItem(isChangedItem ? null : id);
    } else {
      text = newText;
      dispatch(updateNote({id, text}));
      setChangedItem(isChangedItem ? null : id);
    }
  }

  return (
    <div className="item-note" key={id}>
      {
        isChangedItem ? (
          <input value={newText} onChange={handleChange} autoFocus={true}/>
        ) : (
          <span className="item-text">{newText}</span>
        )
      }
      <button onClick={updateItem} >
        {isChangedItem ? "Save" : "Edit"}
      </button>
      <MdDeleteForever className="delete-icons" onClick={() => dispatch(deleteNote(id))}/>
    </div>
  )
}

export default Note;
