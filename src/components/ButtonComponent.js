import React from "react"


function ButtonComponent(props) {
    return (
        <button
            onClick={props.handleOnClick}
            type="submit"
            className="btn btn-primary btn-lg btn-block"
        >
            Skicka
      </button>
    )
}

export default ButtonComponent