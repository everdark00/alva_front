import React from "react"
import "../styles/Main.css"

function ProductPageButton({numButton, actButton, goToPage}) {
    if (actButton !== numButton) {
        return (
        <div>
            <button onClick={() => goToPage(numButton)} className="page_button">
                <p className="pb_title">{numButton}</p>
            </button>
        </div>
        );
    } else {
        return (
        <div>
            <button className="page_button page_button_act">
                <p className="pb_title pb_title_act">{numButton}</p>
            </button>
        </div>
        );
    }
}

export default ProductPageButton;