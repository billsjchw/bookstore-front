import React from 'react';
import books from "./books";
import BookList from "./components/BookList/BookList";

function App() {
  return (
      <BookList
          books={books}
          rowNum={1}
          colNum={4}
          pageRange={5}
      />
  );
}

export default App;
