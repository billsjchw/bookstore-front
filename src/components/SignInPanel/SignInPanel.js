import React from "react";
import "../../bootstrap.css";
import "./SignInPanel.css"
import {Input, Button} from "reactstrap";

class SignInPanel extends React.Component {
    render() {
        return (
            <div className="sign-in-panel d-flex flex-column align-items-center">
                <img className="mb-3" src={require("../../images/icons/books.png")} alt="books"/>
                <h1 className="h3 mb-3">e-Book</h1>
                <div className="mb-3 w-100">
                    <Input size="lg" type="username" placeholder="Username"/>
                    <Input size="lg" type="password" placeholder="Password"/>
                </div>
                <Button block size="lg" color="primary" href="/books">Sign in</Button>
                <p className="mt-5 mb-3"></p>
            </div>
        );
    }
}

export default SignInPanel;