import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store/store';
import { getNotes, searchNote } from '../../store/noteSlice';

import { MdSearch } from 'react-icons/md';

interface ISearch {
  handleSearchNote(params: string): void;
}

const Search: React.FC<ISearch> = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setSearchText(event.target.value);
      dispatch(searchNote(searchText));
    }
  };

  useEffect(() => {
    if (searchText.length < 1) {
      dispatch(getNotes());
    }
  }, [searchText.length, dispatch]);

  return (
    <form className="search">
      <MdSearch className="search-icons" size="1.3em" />
      <input type="text" placeholder="search..." onChange={handleChange} />
    </form>
  )
}
export default Search;
