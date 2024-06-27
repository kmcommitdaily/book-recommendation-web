import React, { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

interface BooksApiResponse {
  items: Book[];
}

interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<Book[]>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
  const [input, setInput] = useState<string>('');

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=10`
      );
      const data: BooksApiResponse = await response.json();
      const fetchedBooks: Book[] = data.items.map((item) => ({
        id: item.id,
        volumeInfo: {
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors ?? [],
          description: item.volumeInfo.description ?? '',
          imageLinks: item.volumeInfo.imageLinks ?? { thumbnail: '' },
        },
      }));
      setResults(fetchedBooks);
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };

  const handleClick = () => {
    fetchData();
  };

  return (
    <div className="bg-slate-50 w-56 p-2 flex items-center justify-center gap-2">
      <input
        className="text-center border border-solid border-black bg-slate-100"
        type="text"
        placeholder="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};
