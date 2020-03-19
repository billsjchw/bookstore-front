import React from 'react';
import books from "./books";
import BookCard from "./components/BookCard/BookCard";

function App() {
  return (
      <BookCard book={books[0]}/>
  );
}

export default App;
