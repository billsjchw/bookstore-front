import React from 'react';
import books from "./books";
import BookGrid from "./components/BookGrid/BookGrid";

function App() {
  return (
      <BookGrid books={books} colNum={4}/>
  );
}

export default App;
