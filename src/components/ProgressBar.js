import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';;

const ProgressBar = ({ showNotes }) => {

    const howMany = () => {
        showNotes();
    }

    return (
        <div>
            <Typography className="progress-message" color="secondary" variant="body2">You have 0/{howMany} notes completed</Typography>
            <LinearProgress className="progress-bar" variant="determinate" value="0" />
        </div>  
    )
}

export default ProgressBar;
