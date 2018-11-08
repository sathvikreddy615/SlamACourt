import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import APIManager from "../APIManager";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import "./Register.css";

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
    },
    root: {
        background: "white"
    },
    input: {
        color: "white"
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
                <Grid 
                    id="registerBackground"
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Typography variant="h2">
                        Slam-A-Court
                    </Typography>
                    <form onSubmit={this.handleRegister} className={classes.container} noValidate autoComplete="off">
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <TextField
                                id="registerName"
                                className={classes.root}
                                InputProps={{
                                    className: classes.input
                                }}
                                label="Name"
                                className={classes.textField}
                                type="text"
                                autoComplete="current-name"
                                margin="normal"
                                onChange={this.handleFieldChange('name')}
                            />
                        </Grid>
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <TextField
                                id="registerEmail"
                                className={classes.root}
                                InputProps={{
                                    className: classes.input
                                }}
                                label="Email"
                                className={classes.textField}
                                type="email"
                                autoComplete="current-email"
                                margin="normal"
                                onChange={this.handleFieldChange('email')}
                            />
                        </Grid>
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <TextField
                                id="registerPassword"
                                className={classes.root}
                                InputProps={{
                                    className: classes.input
                                }}
                                label="Password"
                                className={classes.textField}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                onChange={this.handleFieldChange('password')}
                            />
                        </Grid>

                        <Grid container
                            spacing={0}
                            direction="row"
                            alignItems="center"
                            justify="center"
                        >
                            <Button type="submit" id="registerBtn" variant="contained" color="primary" className={classes.button}>
                                Register
                            </Button>
                            <Button style={{ textDecoration: 'none', color: 'white' }} variant="contained" color="secondary">
                                <Link id="backToLoginBtn" to={{ pathname: "/login" }}>Back to Login</Link>
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </React.Fragment>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
