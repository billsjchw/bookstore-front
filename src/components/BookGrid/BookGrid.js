import React from "react";
import '../../bootstrap.css';
import BookCard from "../BookCard/BookCard";

class BookGrid extends React.Component {
    render() {
        let rows = [];
        for (let i = 0; i < this.props.books.length; i += this.props.colNum) {
            let cards = [];
            for (let j = 0; j < this.props.colNum && i + j < this.props.books.length; ++j)
                cards.push(<BookCard key={j} book={this.props.books[i + j]}/>);
            rows.push(<div key={i} className="d-flex">{cards}</div>);
        }
        return <div className="book-grid">{rows}</div>;
    }
}

export default BookGrid;