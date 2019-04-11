import React from "react"
import ButtonComponent from "./ButtonComponent"

function FormComponent(props){
    
    return(
        <div className="container">
        <div className="row form-section">

          <form className="book-form col-6">
            <legend>Lägg till dina favoritböcker</legend>
            <div className="form-group">

              <input
                type="text"
                name="title"
                value={props.title}
                className="form-control"
                id="title"
                aria-describedby="title"
                placeholder="Lägg till titel"
                onChange={props.handleInput}
              />


              <input
                type="text"
                className="form-control"
                name="author"
                value={props.author}
                id="author"
                rows="3"
                data-gramm="true"
                data-txt_gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                data-gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                data-gramm_editor="true"
                placeholder="Lägg till författare"
                onChange={props.handleInput}
              />

            </div>
            <ButtonComponent handleOnClick={props.handleOnClick} />
          </form>

        </div>
      </div>
    )
}

export default FormComponent;