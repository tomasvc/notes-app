import React, { useState } from 'react'

const Filter = ({ onFilter }) => {

    let style = 'none';

    const onSetFilter = (e) => {

        onFilter(e.target.value)

        e.target.value == 'all' ? style = '#69BCFF' :
        e.target.value ==  'home' ? style = '#FF9100' :
        e.target.value == 'work' ? style = '#5C6BC0' :
        e.target.value == 'personal' ? style = '#66BB6A' :
        style = 'none';
        
    };

    return (
        <div className="filter-buttons">
            <button className="all-btn" value="all" onClick={onSetFilter} style={{'backgroundColor': style}}>All</button>
            <button className="home-btn" value="home" onClick={onSetFilter} style={{'backgroundColor': style}}>Home</button>
            <button className="work-btn" value="work" onClick={onSetFilter} style={{'backgroundColor': style}}>Work</button>
            <button className="personal-btn" value="personal" onClick={onSetFilter} style={{'backgroundColor': style}}>Personal</button>
        </div>
    )
}

export default Filter
