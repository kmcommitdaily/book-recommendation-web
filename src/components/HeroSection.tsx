import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BookCarousel from './BookCarousel';
import BookRecommendations from './BookRecommendations';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container mx-auto border-t border-b border-solid border-black py-10 flex flex-col items-center">
      <div className="flex items-center">
        <input
          type="text"
          className="border border-solid border-black p-1"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={() => setSearchQuery('')}>Clear</button>
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <BookRecommendations searchQuery={searchQuery} />
      <BookCarousel />
    </div>
  );
};

export default HeroSection;
