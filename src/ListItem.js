import React, { Component } from 'react'

class ListItem extends Component {
    render() {
    const { title  , handler } = this.props;

        return (
            <li
                className="list__item"
                onClick={(e) => handler(e)}
            >{title}</li>
        )
    }

}

export default ListItem