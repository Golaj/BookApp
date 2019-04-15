import React from "react";


function EditButton(props) {

    const url = "https://www.forverkliga.se/JavaScript/api/crud.php?"

    function showAlert(){
        return( window.alert("Updated, please refresh the page to see it in the list."))
    }

   function updateBook() {
        const title = prompt("New title");
        const author = prompt("New author");
        if (!title || !author) {
            window.alert("Book not updated.")
        } else {
          props.request((url + "op=update&&key=" + props.apiKey
           + "&&id=" + props.id
           + "&&title=" + title
           + "&&author=" + author), showAlert
           )}
    }
                    
    return (
        <button onClick={updateBook} type="button" className="btn btn-success">
            Editera
                </button>
    )

}

export default EditButton;


