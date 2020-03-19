import React from "react";
import '../../bootstrap.css'
import './BookCard.css'
import {Card} from "react-bootstrap";

class BookCard extends React.Component {
    render() {
        return (
            <Card className="book-card" onClick={this.handleClick}>
                <div className="d-flex justify-content-center pt-3 pl-3 pr-3">
                    <img src={require("../../images/books/" + this.props.book.image)} alt={this.props.book.title}/>
                </div>
                <Card.Body>
                    <Card.Text className="text-ellipsis">
                        {this.props.book.title}<br/>
                        {this.props.book.author}<br/>
                        &yen;{this.props.book.price.toFixed(2)}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
    handleClick = (e) => {
        console.log(this.props.book.id);
    }
}

export default BookCard;
