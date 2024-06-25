import React, { useState, useEffect } from 'react';

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

interface Props {
  searchQuery: string;
}

const BookRecommendations: React.FC<Props> = ({ searchQuery }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            searchQuery
          )}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data: BooksApiResponse = await response.json();

        if (data.items) {
          const fetchedBooks: Book[] = data.items.map((item) => ({
            id: item.id,
            volumeInfo: {
              title: item.volumeInfo.title,
              authors: item.volumeInfo.authors ?? [],
              description: item.volumeInfo.description ?? '',
              imageLinks: item.volumeInfo.imageLinks ?? { thumbnail: '' },
            },
          }));
          setBooks(fetchedBooks);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchBooks();
    } else {
      setBooks([]); // Clear books when search query is empty
    }
  }, [searchQuery]);

  return (
    <div>
      <h2>Book Recommendations</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>Title:</strong> {book.volumeInfo.title} <br />
            <strong>Authors:</strong> {book.volumeInfo.authors?.join(', ')}{' '}
            <br />
            {book.volumeInfo.description && (
              <>
                <strong>Description:</strong>{' '}
                {book.volumeInfo.description.substring(0, 200)}...
              </>
            )}
            <br />
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                style={{ maxWidth: '100px', maxHeight: '150px' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookRecommendations;
