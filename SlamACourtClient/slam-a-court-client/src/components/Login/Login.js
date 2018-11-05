import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import APIManager from "../APIManager";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
        email: "",
        password: ""
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleLogin = e => {
        e.preventDefault();

        APIManager.getUserByEmail(this.state.email).then(user => {
            if (user.length > 0 && this.state.password === user[0].password) {
                this.setState({ userId: user[0].id });
            } else {
                alert("Uh oh, looks like you mistyped your email or password");
                window.location.reload(true);
            }
        }).then(() => {
            if (this.state.userId) {
                localStorage.setItem(
                    "credentials",
                    JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                        userId: this.state.userId
                    })
                );
            }
        })
            .then(() => {
                this.props.history.push("/");
            })
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >


                    <form onSubmit={this.handleLogin} className={classes.container} noValidate autoComplete="off">
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            >
                            <TextField
                                id="standard-email-input"
                                label="Email"
                                className={classes.textField}
                                type="email"
                                autoComplete="Email"
                                margin="normal"
                                onChange={this.handleChange('email')}
                            />
                        </Grid>
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                className={classes.textField}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                onChange={this.handleChange('password')}
                            />
                        </Grid>
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <Button type="submit" id="loginBtn" variant="contained" color="primary" className={classes.button}>
                                Login
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
