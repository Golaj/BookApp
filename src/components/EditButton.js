import React from "react";

function EditButton(props) {
    function updateBook() {
        const title = prompt("New title");
        const author = prompt("New author");
        if (!title || !author) {
            window.alert("Book not updated.")
        } else {
            updateBookOnAPI(title, author);
        }
    }
    function updateBookOnAPI(title, author) {
        fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=update&&key=" +
            props.apiKey + "&&id=" + props.id + "&&title=" + title + "&&author=" + author)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.status === "success") {
                    window.alert("The book has been updated.")
                    window.location.reload();

                } else {
                    console.log("something went wrong");
                    updateBookOnAPI(title, author);
                }
            })
    }

    return (
        <button onClick={updateBook} type="button" className="btn btn-success">
            Editera
                </button>
    )

}

export default EditButton;


