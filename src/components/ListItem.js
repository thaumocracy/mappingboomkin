import React, { Component } from 'react'
import './listItem.css'

class ListItem extends Component {
    render() {
    const { title  , clickHandler } = this.props;

        return (
            <li
                role={'menuitem'}
                tabIndex={'0'}
                className="list__item"
                onClick={(e) => clickHandler(e)}
                onKeyPress={(e) => {
                    if(e.key === "Enter"){
                        clickHandler(e);
                      }
                    }
                }
            >{title}</li>
        )
    }

}

export default ListItem