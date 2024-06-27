import React, { useState, useEffect } from 'react';

interface Book {
  id: string;
  title: string;
  authors: string[];
  imageLinks: {
    thumbnail: string;
  };
}

interface VolumeInfo {
  title: string;
  authors: string[];
  imageLinks: {
    thumbnail: string;
  };
}

interface BookItem {
  id: string;
  volumeInfo: VolumeInfo;
}

interface BooksApiResponse {
  items: BookItem[];
}

export type { VolumeInfo, BookItem, BooksApiResponse };

const BookCarousel: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10'
      );
      const data: BooksApiResponse = await response.json();
      setBooks(
        data.items.map((item: BookItem) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          imageLinks: item.volumeInfo.imageLinks,
        }))
      );
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + books.length) % books.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={handlePrev}
        className="bg-gray-800 text-white p-2 rounded-full">
        ❮
      </button>
      <div className="flex justify-center items-center mx-4">
        {books.length > 0 && (
          <div className="flex flex-col justify-between">
            <img
              src={books[currentIndex].imageLinks.thumbnail}
              alt={books[currentIndex].title}
              className="w-64 h-96 object-contain"
            />
            <div className="mt-2 text-center">
              <h3>{books[currentIndex].title}</h3>
              <p>{books[currentIndex].authors.join(', ')}</p>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleNext}
        className="bg-gray-800 text-white p-2 rounded-full">
        ❯
      </button>
    </div>
  );
};

export default BookCarousel;
