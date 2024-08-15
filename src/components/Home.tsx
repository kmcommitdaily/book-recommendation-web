import React, { useState } from 'react';
import { SearchBar } from './SearchBar';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

export const Home = () => {
  const [results, setResults] = useState<Book[]>([]);

  return (
    <div
      className={
        results.length > 0
          ? 'bg-white h-screen p-4'
          : 'bg-white flex flex-col items-center justify-center h-screen'
      }>
      <div className="search-bar mb-4">
        <SearchBar setResults={setResults} />
      </div>

      <div className="results-container">
        {results.length > 0 ? (
          <ul>
            {results.map((book) => (
              <li key={book.id} className="mb-4">
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(', ')}</p>
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  alt={book.volumeInfo.title}
                  className="w-32 h-auto"
                />
                <p>{book.volumeInfo.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};
