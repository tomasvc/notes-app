import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';;

const ProgressBar = ({ noteNum, completeNum }) => {

    const [value, setValue] = useState(0);

    const calculateValue = (num) => {
        if(num === 0) {
            setValue(0)
        }
        if (num % completeNum == 0) {
            setValue(100)
        }
    }

    return (
        <div>
            <Typography className="progress-message" color="secondary" variant="body2">You have {completeNum ? completeNum : '0'}/{noteNum ? noteNum : '0'} notes completed</Typography>
            <LinearProgress className="progress-bar" variant="determinate" value={value} />
        </div>  
    )
}

export default ProgressBar;
