import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../store/store';
import { createTag, deleteTag } from '../../store/tagSlice';
import { filterNotesByTag } from '../../store/noteSlice';

import { MdClose } from 'react-icons/md';

export interface ITagData {
  id: number;
  text: string;
}

const TagsList = () => {
  const tags = useSelector<RootState>((state) => state.tags.tags) as ITagData[];
  const [text, setText] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value !== '') {
      if (!tags.map(el => el.text.toLowerCase()).includes(text.toLowerCase())) {
        dispatch(createTag(text));
        event.currentTarget.value = '';
      } else {
        alert('This tag already exists')
        event.currentTarget.value = '';
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  }

  return (
    <div className="tags-list">
      <ul className="tags">
        {
          tags.map((tag) => (
            <li key={tag.id} className="tag">
              <span className="tag-name" onClick={() => {
                dispatch(filterNotesByTag(tag.text))}
              }>#{tag.text}
              </span>
              <MdClose className="delete-icons" onClick={() => dispatch(deleteTag(tag.id))} />
            </li>
            )
          )
        }
      </ul>
      <input type="text" onKeyUp={addTag} onChange={handleChange} placeholder="Press enter to add a tag"/>
    </div>
  )
}

export default TagsList;
