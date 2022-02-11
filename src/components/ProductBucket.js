import React from "react"
import { useNavigate } from "react-router-dom";


function ProductBucket({prod, addProd, removeProd}){
    return (
        <div className="prod_bucket_element">
            <p className="prod_bucket_text prod_bucket_text_title">{prod.title}</p>
            <p className="prod_bucket_text prod_bucket_text_price">{prod.price * prod.number}</p>
            <div className="number_element">
                <button onClick={()=>removeProd(prod.id)} className="num_btn">-</button>
                <p className="prod_bucket_text prod_bucket_text_number">{prod.number}</p>
                <button onClick={()=>addProd(prod.id)} className="num_btn">+</button>
            </div>
        </div>
    );
}

export default ProductBucket;

