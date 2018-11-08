import React, { Component } from "react";
import APIManager from "../APIManager";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Navbar from "../Navbar/Navbar";
import Typography from '@material-ui/core/Typography';
import "./Home.css";

export default class Home extends Component {
    state = {
        userName: ""
    }

    greetUser = () => {
        let localUser = JSON.parse(localStorage.getItem("credentials"));
        let userNameClone = "";

        APIManager.getUserById(localUser.userId).then(user => {
            userNameClone = user.name
            this.setState({
                userName: userNameClone
            })
        });
    }

    componentDidMount = () => {
        this.greetUser()
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Grid
                    id="homeBackground"
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Typography id="greeting" variant="h4">Hello, {this.state.userName}</Typography>
                    <br />
                    <Button type="button" variant="contained" color="secondary">
                        <Link id="getStartedBtn" to={{ pathname: "/book-a-court" }}>Get Started</Link>
                    </Button>
                </Grid>
            </React.Fragment>
        );
    }
}

// exports to ApplicationViews
