import React from "react";

function DeleteButton(props) {
    function deleteFromApi(){
        fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&&key=" + props.apiKey + "&&id=" + props.id)
        .then(function(response){
            return response.json();
        }).then(function(data){
            if(data.status ==="success"){
                window.alert("The book has been removed.")
                window.location.reload();
            }
        })
    }
    return (
        <button onClick={deleteFromApi} type="button" className="btn btn-danger">
            Ta bort
                    </button>
    )
}



export default DeleteButton;