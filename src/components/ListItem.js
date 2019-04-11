import React from 'react';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

export default(props) => (
    <li className="list-item list-group-item d-flex align-items-center">
        <strong className="title">
        {props.title}</strong>
        <div className="author">
        {props.author}</div>

        <div className="buttons">
            <EditButton apiKey={props.apiKey} id={props.id}/>
            <DeleteButton apiKey={props.apiKey} id={props.id}/>
        </div>
    </li>
)