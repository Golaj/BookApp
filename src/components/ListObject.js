import React from 'react'
import ListItem from './ListItem';

function ListObject(props) {
    if (props.books) {
        return (
            <ul className="list-group">
                {props.books.map((x) => (
                    <ListItem key={x.id} title={x.title} author={x.author} />
                ))}
            </ul>
        )
    } else {
        return(
            <div>Loading...</div>
        )
    }
}

export default ListObject;