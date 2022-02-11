import React, {useState} from "react"
import ProductPageButton from "./ProductPageButton";
import "../styles/Main.css"

function ProductPagesButtons({goToPage, state, goToNextPageLeft, goToNextPageRight}) {
    let actButton = state.activePage;
    if (state.pages.length > 1){
        return (
        <div className='page_buttons'>
            <button onClick={() => goToNextPageLeft(actButton)} className='page_button'>
                <span className="pb_title">{"<"}</span>
            </button>
            {state.pages.map(elem => <ProductPageButton key={elem} numButton={elem} actButton={actButton} goToPage={goToPage}/>)}
            <button onClick={() => goToNextPageRight(actButton)} className='page_button'>
                <span className="pb_title">{">"}</span>
            </button>
        </div>
        );
    } else {
        return (
        <div>
        </div>
        );
    }
}

export default ProductPagesButtons;