import { useCmsClient } from '@/app/client/restClient/cmsClient';
import React, { ChangeEvent, useState } from 'react';
import './styles.css'
interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (query: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, placeholder = 'Search...', onChange, onSubmit }) => {


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="search-bar container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
      />
      <button onClick={onSubmit} className='search-button'>Search</button>
    </div>
  );
};

export default SearchBar;