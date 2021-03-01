import React, { useState } from 'react'

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

    const [active, setActive] = useState(false);

    let lineColor = '';

    note.category == 'home' ? lineColor = '#FF9100' : 
    note.category == 'work' ? lineColor = '#5C6BC0' : 
    note.category == 'personal' ? lineColor = '#66BB6A' : 
    lineColor = '';

    let textColor = '#555';
    let textDecoration = 'line-through';

    let style = {'color': textColor, 'textDecoration': textDecoration, 'transition': '0.2s ease'}

    const onCheck = () => {
        if (active == false) {
            setActive(true);
            textColor = '#555';
            textDecoration = 'line-through'; 
        } else {
            setActive(false);
            textColor = 'black';
            textDecoration = 'none'; 
        }
        
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

        

        <Card className="note" style={ active ? {'backgroundColor': '#00000015', 'transition': '0.2s ease'} :{'transition': '0.2s ease'}}>
            <CardMedia component="div" style={{
                'backgroundColor': lineColor,
                'padding': '5px',
                'position': 'relative',
                'top': '-20px',
                'left': '-20px',
                'width': '110%'
                }}></CardMedia>
            <CardContent>
                
                <CardActions>
                    <Checkbox className="note-checkbox" color="primary" checked={active} onClick={onCheck}></Checkbox>
                </CardActions>
                <Typography className="note-title" variant="h6" style={ active ? style : {'transition': '0.2s ease'}}>{note.name}</Typography>
                <CardActions>
                    <IconButton className="edit-btn" onClick={() => onEdit(note.id)} aria-label="edit"><EditIcon /></IconButton>
                    <IconButton className="delete-btn" onClick={() => onDelete(note.id)} aria-label="delete"><DeleteIcon /></IconButton>
                </CardActions>
                <Typography className="note-description" variant="body1" style={ active ? style : {'transition': '0.2s ease'}}>{note.description}</Typography>
            </CardContent>
        </Card>
        
    )
}

export default Note