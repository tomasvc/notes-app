import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';;

const ProgressBar = ({ noteNum, completeNum, value }) => {

    return (
        <div className="progress-container">
            <Typography className="progress-message" color="secondary" variant="body2">You have {completeNum}/{noteNum} notes completed</Typography>
            <LinearProgress className="progress-bar" variant="determinate" value={value} />
        </div>  
    )
}

export default ProgressBar;
