import React, { Component } from 'react'

class ListItem extends Component {
    constructor(props){
        super(props)
    }
    render() {
    const { title , ident , handler } = this.props;

        return (
            <li 
                className="list__item"
                onClick={(e) => handler(e)}
            >{this.props.title}</li>
        )
    }

}

export default ListItem