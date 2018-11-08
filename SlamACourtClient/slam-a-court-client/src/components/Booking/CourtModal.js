import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import PartnerSelection from "./PartnerSelection";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();

    return {
        top: `${top}%`,
        margin: 'auto'
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
    state = {};

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
                        <Typography nowrap variant="subtitle2" id="modal-title">
                            <u>{this.props.userName} has made the following reservation:</u>
                        </Typography>
                        <br />
                        <Typography variant="caption" id="simple-modal-court">
                            <b>Court:</b> {this.props.userSelectedCourt}
                        </Typography>
                        {/* <br /> */}
                        <Typography variant="caption" id="simple-modal-surface">
                            <b>Surface:</b> {this.props.userSelectedSurface}
                        </Typography>
                        {/* <br /> */}
                        <Typography variant="caption" id="simple-modal-startDate">
                            <b>Date:</b> {this.props.startDate}
                        </Typography>
                        <br />
                        <Typography id="simple-modal-partners">
                            <i>Please add the partner(s) you will be playing with:</i>
                        </Typography>
                        <Typography id="simple-modal-description">
                            <PartnerSelection
                                bookedTennisCourtId={this.props.bookedTennisCourtId}
                                names={this.props.names}
                                name={this.state.name} />
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
