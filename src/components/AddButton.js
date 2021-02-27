import React from 'react'

import Button from '@material-ui/core/Button';

const AddButton = ({ handleClick }) => {
    return (
        <Button color="primary" variant="contained" className="add-btn" onClick={handleClick}>Add Note</Button>
    )
}

export default AddButton
