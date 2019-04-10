import React from 'react'
import ListItem from './ListItem';

export default (props) => (
    <ul className="list-group">
        {props.books.map((x) => (
            <ListItem key={x.id} title={x.title} author={x.author} />
        ))}
    </ul>
)