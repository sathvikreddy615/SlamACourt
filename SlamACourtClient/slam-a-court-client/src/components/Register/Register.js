import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import APIManager from "../APIManager";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class TextFields extends React.Component {
    state = {
        name: "",
        email: "",
        password: ""
    };

    handleFieldChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleRegister = e => {
        e.preventDefault();

        let registerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        const registerName = document.getElementById("registerName").value;
        const registerEmail = document.getElementById("registerEmail").value;
        const registerPassword = document.getElementById("registerPassword").value;

        if (
            registerName === null ||
            registerEmail === "" ||
            registerPassword === ""
        ) {
            alert("Please fill out all blank fields!");
        } else {
            APIManager.registerUser(registerData)
                .then(user => {
                    console.log(user);
                })
                .then(() => {
                    this.props.history.push("/login");
                });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <br />
                <br />
                <br />
                <br />
                <form onSubmit={this.handleRegister} className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="registerName"
                        label="Name"
                        className={classes.textField}
                        type="text"
                        autoComplete="current-name"
                        margin="normal"
                        onChange={this.handleFieldChange('name')}
                    />
                    <TextField
                        id="registerEmail"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        autoComplete="current-email"
                        margin="normal"
                        onChange={this.handleFieldChange('email')}
                    />
                    <TextField
                        id="registerPassword"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.handleFieldChange('password')}
                    />

                    <Button type="submit" id="registerBtn" variant="contained" color="primary" className={classes.button}>
                        Register
                    </Button>
                </form>

                <Button type="submit" id="backToLoginBtn" variant="contained" color="primary" className={classes.button}>
                    <Link to={{ pathname: "/login" }}>Back to Login</Link>
                </Button>
            </React.Fragment>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
