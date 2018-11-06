import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import BookButton from "./BookButton";
import PartnerSelection from "./PartnerSelection";
import APIManager from "../APIManager";
import moment from 'moment';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        margin: 'auto'
        // left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class SimpleModal extends React.Component {
    state = {

    }

    // componentDidUpdate = () => {
    //     console.log(this.props.bookedTennisCourtId)
    // }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.openModal}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            <PartnerSelection bookedTennisCourtId={this.props.bookedTennisCourtId} names={this.props.names} name={this.state.name} />
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            {/* <Button onClick={this.addPartners} variant="contained" color="primary" className={this.button}>
                                Confirm
                            </Button> */}
                        </Typography>
                        <SimpleModalWrapped />
                    </div>
                </Modal>
            </div>
        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
