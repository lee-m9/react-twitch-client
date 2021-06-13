import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "./actions";

class GoogleAuth extends Component {
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
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        const borderRadius = { borderRadius: "0" };
        if (this.props.isSignedIn === null) {
            return <button className="circular ui red loading button"></button>;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    className="ui red google button"
                    onClick={this.onSignOutClick}
                    style={borderRadius}
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
                    style={borderRadius}
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

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
