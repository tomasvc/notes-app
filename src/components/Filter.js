import React from 'react'

const Filter = ({ onFilter }) => {

    const onSetFilter = (e) => {
        onFilter(e.target.value)
    }

    return (
        <div className="filter-buttons">
            <button className="all-btn" value="all" onClick={onSetFilter}>All</button>
            <button className="home-btn" value="home" onClick={onSetFilter}>Home</button>
            <button className="work-btn" value="work" onClick={onSetFilter}>Work</button>
            <button className="personal-btn" value="personal" onClick={onSetFilter}>Personal</button>
        </div>
    )
}

export default Filter
