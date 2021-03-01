import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';;

const ProgressBar = ({ noteNum }) => {

    const [value, setValue] = useState(0);

    const calculateValue = (noteNum) => {
        
    }

    return (
        <div>
            <Typography className="progress-message" color="secondary" variant="body2">You have 0/{noteNum ? noteNum : '0'} notes completed</Typography>
            <LinearProgress className="progress-bar" variant="determinate" value="0" />
        </div>  
    )
}

export default ProgressBar;
