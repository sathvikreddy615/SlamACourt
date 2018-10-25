import React, { Component } from "react";
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import APIManager from "../APIManager";

export default class Manage extends Component {
    state = {
        courtSurface: "",
        courtName: ""
    };

    componentDidMount = () => {
        APIManager.getAllData("tenniscourt").then(arrOfTennisCourts => {
            console.log(arrOfTennisCourts);
        })
      };


    render() {
        return (
            <React.Fragment>
                <br />
                <br />
                <h1>Hello World</h1>
            </React.Fragment>
        )
    }
}

// exports to ApplicationViews
