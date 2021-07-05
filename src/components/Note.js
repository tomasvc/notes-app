import React, { useState } from 'react';

import { Card, CardActions, CardContent, CardMedia, Typography, Checkbox, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const Note = ({ note, onComplete, onDelete }) => {

    const [complete, setComplete] = useState(false);

    let borderColor = '';

    note.category === 'home' ? borderColor = '#FF9100' : 
    note.category === 'work' ? borderColor = '#5C6BC0' : 
    note.category === 'personal' ? borderColor = '#66BB6A' : 
    borderColor = '';

    let textColor = '#555';
    let textDecoration = 'line-through';

    let style = {'color': textColor, 'textDecoration': textDecoration, 'transition': '0.2s ease'}

    const onCheck = () => {

        if (complete === false) {

            setComplete(true);
            textColor = '#555';
            textDecoration = 'line-through'; 
            onComplete(complete);

        } else {

            setComplete(false);
            textColor = 'black';
            textDecoration = 'none'; 
            onComplete(complete)

        }
        
    }            

    return (

        <>

        <Card className="note" style={ complete ? {'backgroundColor': '#00000015', 'transition': '0.2s ease'} : {'transition': '0.2s ease'}}>

            <CardMedia component="div" style={{
                'backgroundColor': borderColor,
                'padding': '5px',
                'position': 'relative',
                'top': '-20px',
                'left': '-20px',
                'width': '110%'
                }}>    
            </CardMedia>

            <CardContent className="card-content">
                
                <div className="card-header">
                    <div className="header-left">
                        <CardActions>
                            <Checkbox className="note-checkbox" color="primary" checked={complete} onClick={() => onCheck(note.id)}></Checkbox>
                        </CardActions>
                        <Typography className="note-title" variant="h6" style={ complete ? style : {'transition': '0.2s ease'}}>{note.name}</Typography>
                    </div>
                    <CardActions className="card-actions">
                        <IconButton className="delete-btn" onClick={() => onDelete(note.id, complete)} aria-label="delete"><DeleteIcon /></IconButton>
                    </CardActions>
                </div>
                <Typography className="note-description" variant="body1" style={ complete ? style : {'transition': '0.2s ease'}}>{note.description}</Typography>
            </CardContent>

        </Card>

        </>
        
    )
}

export default Note