import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    addSpace: {
        display: 'block'
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class ControlledExpansionPanels extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                {this.props.courtsDetails.map(row => {
                    return (
                        <ExpansionPanel expanded={expanded === row.bookedTennisCourtId} onChange={this.handleChange(row.bookedTennisCourtId)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}><b>{row.court}</b></Typography>
                                <Typography className={classes.secondaryHeading}>{row.date}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.addSpace}>
                                <Typography><b>Court:</b> {row.court}</Typography>
                                <br />
                                <Typography><b>Surface:</b> {row.surface}</Typography>
                                <br />
                                <Typography><b>Partners:</b> {row.partners}</Typography>
                                <br />
                                <Typography><b>Date:</b> {row.date}</Typography>
                                <br />
                                <Typography>
                                    <Button value={row.bookedTennisCourtId}
                                        id={row.bookedTennisCourtId}
                                        onClick={this.props.deleteBookedCourt} variant="contained" color="secondary" className={classes.button}>
                                        Cancel
                                        <DeleteIcon className={classes.rightIcon} />
                                    </Button>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })}
            </div>
        );
    }
}

ControlledExpansionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);