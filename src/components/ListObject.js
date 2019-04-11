import React from 'react'
import ListItem from './ListItem';

function ListObject(props) {





    if (props.books) {
        return (
            <div className="display-books">
                <div className="container">
                    <div className="col-12">
                        <ul className="list-group">
                            {props.books.map((x) => (
                                <ListItem key={x.id} title={x.title} author={x.author} id={x.id} apiKey={props.apiKey}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default ListObject;