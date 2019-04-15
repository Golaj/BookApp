import React from "react";

function DeleteButton(props) {

    const url = "https://www.forverkliga.se/JavaScript/api/crud.php?"

    function deleteBook() {
        props.request((url +"op=delete&&key=" + props.apiKey + "&&id=" + props.id), data => {
            window.alert("Deleted! Refresh to see updated list.");
        })
    }

    return (
        <button onClick={deleteBook} type="button" className="btn btn-danger">
            Ta bort
                    </button>
    )
}



export default DeleteButton;