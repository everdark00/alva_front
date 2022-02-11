import React from "react"
import { useNavigate } from "react-router-dom";
import ProductBucket from "../components/ProductBucket"


function ProductPageBucket({state, addProd, removeProd}){
    let start_show = (state.act_page - 1) * 5
    let end_show = Math.min(state.act_page * 5, state.selected_goods.length)
    return (
        state.selected_goods.slice(start_show, end_show).map(item => <ProductBucket prod ={item} addProd={addProd} removeProd={removeProd}/>)
    )
}

export default ProductPageBucket;