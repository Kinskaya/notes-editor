import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNote } from '../../store/noteSlice';
import { AppDispatch } from '../../store/store';

export interface IInputData {
  text: string;
}

const NotesForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const addItem = () => {
    if (text.trim().length) {
      dispatch(createNote(text));
      setText('');
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  }

  return (
    <label>
      <input
        className="form-input"
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Your note..."
      />
      <button className="form-btn" onClick={addItem}>Add</button>
    </label>
  )
}

export default NotesForm;
