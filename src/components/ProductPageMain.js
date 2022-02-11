import React from "react"
import '../styles/Main.css';
import ProductMain from "./ProductMain";

function ProductPageMain({state}) {
    let start_show = (state.activePage - 1) * 10
    let end_show = Math.min(state.activePage * 10, state.goods.length)
    return (
        <div className="goods">
            {state.goods.slice(start_show, end_show).map(elem=><ProductMain key={elem.id} item={elem}/>)}
        </div>
    );
}

export default ProductPageMain;
