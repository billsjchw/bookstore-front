import React from "react";
import "../../bootstrap.css";
import "./NavigationBar.css"
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap'

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar className="navigation-bar" color="light" light>
                <NavbarBrand href="/">
                    <span className="navigation-bar-brand">e-Book</span>
                </NavbarBrand>
                <Nav className="mr-auto">
                    <NavItem>
                        <NavLink className="text-dark" href='/books'>Books</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="text-dark" href='/'>Shopping Cart</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="text-dark" href='/'>Orders</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;