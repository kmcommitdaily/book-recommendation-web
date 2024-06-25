import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BookCarousel from './BookCarousel';

const HeroSection = () => {
  return (
    <>
      <div className="container mx-auto border-t border-b border-solid border-black py-10 flex flex-col items-center">
        <div>
          <input
            type="text"
            className="border border-solid border-black p-1 "
          />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <BookCarousel />
      </div>
    </>
  );
};
export default HeroSection;
