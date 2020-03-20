import React from "react"
import SignInPanel from "../../components/SignInPanel/SignInPanel";

class SignInPage extends React.Component {
    render() {
        return (
            <div className="d-flex h-100 justify-content-center align-items-center bg-light">
                <SignInPanel/>
            </div>
        );
    }
}

export default SignInPage;