import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div>{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const fieldClassName = `field ${
            meta.error && meta.touched ? "error" : ""
        }`;
        return (
            <div className={fieldClassName}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        console.log(formValues);
    };

    render() {
        return (
            <div className="ui form error">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field
                        name="title"
                        component={this.renderInput}
                        label="Enter Title"
                    ></Field>
                    <Field
                        name="description"
                        component={this.renderInput}
                        label="Enter Description"
                    ></Field>
                    <button className="ui button primary">Create Stream</button>
                </form>
            </div>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = "You must enter a title";
    }

    if (!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;
};

export default reduxForm({
    form: "streamCreate",
    validate,
})(StreamCreate);
