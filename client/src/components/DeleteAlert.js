import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteAlert extends Component {
    handleDelete = (e) => {
        this.props.delete();
    }

    render() {
        return (
            <React.Fragment>
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleDelete} color="secondary" variant="outlined">
                        Delete
                    </Button>
                </DialogActions>
            </React.Fragment>
        )
    }
}

export default DeleteAlert;
