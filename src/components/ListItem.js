import React, { Component } from 'react'
import './listItem.css'

class ListItem extends Component {
    render() {
    const { title  , clickHandler } = this.props;

        return (
            <li
                className="list__item"
                onClick={(e) => clickHandler(e)}
            >{title}</li>
        )
    }

}

export default ListItem