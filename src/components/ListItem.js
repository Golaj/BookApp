import React from 'react';

export default(props) => (
    <li className="list-item list-group-item d-flex align-items-center">
        <strong className="title">Harry Potter poops his pants</strong>
        <div className="author">J.K. Rowling</div>

        <div className="buttons">
            <button type="button" className="btn btn-success">
                Editera
                    </button>
            <button type="button" className="btn btn-danger">
                Ta bort
                    </button>
        </div>
    </li>
)