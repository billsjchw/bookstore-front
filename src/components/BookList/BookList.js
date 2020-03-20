import React from "react";
import "../../bootstrap.css";
import SearchBar from"../SearchBar/SearchBar";
import BookGrid from "../BookGrid/BookGrid";
import Pagination from "react-js-pagination";

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            search: {
                type: "title",
                text: ""
            }
        };
    }
    render() {
        let books = this.props.books.filter(
            (book) => (book[this.state.search.type].toLowerCase().indexOf(this.state.search.text.toLowerCase()) >= 0)
        );
        return (
            <div className="d-flex flex-column align-items-center">
                <SearchBar
                    search={this.state.search}
                    onCommit={this.handleSearchChange}
                />
                <BookGrid
                    books={books.slice(
                        (this.state.page - 1) * this.props.rowNum * this.props.colNum,
                        this.state.page * this.props.rowNum * this.props.colNum
                    )}
                    colNum={this.props.colNum}
                />
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.page}
                    itemsCountPerPage={this.props.rowNum * this.props.colNum}
                    totalItemsCount={books.length}
                    pageRangeDisplayed={this.props.pageRange}
                    onChange={this.handlePageChange}
                    prevPageText="&lsaquo;"
                    nextPageText="&rsaquo;"
                    firstPageText="&laquo;"
                    lastPageText="&raquo;"
                />
            </div>
        );
    }
    handleSearchChange = (search) => {
        this.setState({
            search: {
                type: search.type,
                text: search.text
            }
        });
    }
    handlePageChange = (page) => {
        this.setState({
            page: page
        });
    }
}

export default BookList;