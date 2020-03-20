import React from "react";
import "../../bootstrap.css";
import books from "../../books";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import BookList from "../../components/BookList/BookList";

class BooksPage extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <BookList
                    className="mt-3"
                    books={books}
                    rowNum={2}
                    colNum={4}
                    pageRange={5}
                />
            </div>
        );
    }
}

export default BooksPage;