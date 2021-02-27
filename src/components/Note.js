import React from 'react'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox' ;
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Note = ({ note, onEdit, onDelete }) => {

    let lineColor = '';

    note.category == 'home' ? lineColor = '#FF9100' : 
    note.category == 'work' ? lineColor = '#5C6BC0' : 
    note.category == 'personal' ? lineColor = '#66BB6A' : 
    lineColor = '';


    let noteColor = 'white';

    const onCheck = () => {
        noteColor = '#282E2999';
    }

    return (
        /*<div className={`note ${note.category == 'home' ? 'home' : note.category == 'work' ? 'work' : 'personal'}`}>
            <div>
                <input type="checkbox"></input>
                <div className="click-me"></div>
                <h3 className="note-title">{note.name}</h3><button className="edit-btn" onClick={onEdit}/><button className="delete-btn" onClick={() => onDelete(note.id)}/>
            </div>
            <p className="note-description">{note.description}</p>
        </div>*/

        

        <Card className="note" >
            <CardMedia component="div" style={{
                'backgroundColor': lineColor,
                'padding': '5px',
                'position': 'relative',
                'top': '-20px',
                'left': '-20px',
                'width': '110%'
                }}></CardMedia>
            <CardContent style={{'background': noteColor}}>
                
                <CardActions>
                    <Checkbox className="note-checkbox" color="primary" onClick={onCheck}></Checkbox>
                </CardActions>
                <Typography className="note-title" variant="h6">{note.name}</Typography>
                <CardActions>
                    <IconButton className="edit-btn" onClick={() => onEdit(note.id)} aria-label="edit"><EditIcon /></IconButton>
                    <IconButton className="delete-btn" onClick={() => onDelete(note.id)} aria-label="delete"><DeleteIcon /></IconButton>
                </CardActions>
                <Typography className="note-description" variant="body1">{note.description}</Typography>
            </CardContent>
        </Card>
        
    )
}

export default Note