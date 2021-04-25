//
import React, { Component, Fragment } from "react";

class GoogleAuth extends Component {
    state = { isSignedIn: null };
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "444067189587-q13s7d0pi4fmda33av8ugotl2egaeapb.apps.googleusercontent.com",
                    scope: "email",
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.setState({
                        isSignedIn: this.auth.isSignedIn.get(),
                    });
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <button className="circular ui red loading button"></button>;
        } else if (this.state.isSignedIn) {
            return (
                <button
                    className="ui red google button"
                    onClick={this.onSignOutClick}
                >
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    className="ui red google button"
                    onClick={this.onSignInClick}
                >
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <Fragment>{this.renderAuthButton()}</Fragment>;
    }
}

export default GoogleAuth;
