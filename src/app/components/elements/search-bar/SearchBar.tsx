import { useCmsClient } from '@/app/client/restClient/cmsClient';
import React, { ChangeEvent, useState } from 'react';

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
      <button onClick={onSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;