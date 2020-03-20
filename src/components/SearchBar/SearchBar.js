import React from "react";
import "./SearchBar.css"
import {
    InputGroup,
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    InputGroupAddon,
    Button
} from "reactstrap";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            search: {
                type: props.search.type,
                text: props.search.text
            }
        };
    }
    render() {
        return (
            <InputGroup className="search-bar">
                <InputGroupButtonDropdown
                    addonType="prepend"
                    isOpen={this.state.open}
                    toggle={this.handleOpenChange}
                >
                    <DropdownToggle outline caret>
                        {{title: "Title", author: "Author", isbn: "ISBN"}[this.state.search.type]}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.handleTypeChange.bind(this, "title")}>Title</DropdownItem>
                        <DropdownItem onClick={this.handleTypeChange.bind(this, "author")}>Author</DropdownItem>
                        <DropdownItem onClick={this.handleTypeChange.bind(this, "isbn")}>ISBN</DropdownItem>
                    </DropdownMenu>
                </InputGroupButtonDropdown>
                <Input onChange={this.handleTextChange}/>
                <InputGroupAddon addonType="append">
                    <Button outline color="success" onClick={this.handleCommit}>Search</Button>
                </InputGroupAddon>
            </InputGroup>
        );
    }
    handleOpenChange = () => {
        this.setState({
            open: !this.state.open
        });
    }
    handleTypeChange = (type) => {
        this.setState({
            search: {
                type: type,
                text: this.state.search.text
            }
        });
    }
    handleTextChange = (e) => {
        this.setState({
            search: {
                type: this.state.search.type,
                text: e.target.value
            }
        });
    }
    handleCommit = () => {
        this.props.onCommit(this.state.search);
    }
}

export default SearchBar;
