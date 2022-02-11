import React from "react";
import '../styles/Main.css';
import {Link} from 'react-router-dom';

function ProductMain({item}) {
    let title = item.title;
    let price = item.price;
    let image_path = item.image_path;
    function specialMark() {
      if (item.sale === true) {
        return <p className='prod_sale'>SALE!</p>
      } else if (item.new_col === true) {
        return <p className='prod_new'>New collection!</p>
      }
    }
    return (
      <div className='prod_tmp'>
          <img src={image_path} className='prod_img' />
          <Link to={`/product/${item.id}`} className='prod_ttl'>{title}</Link>
          <p className='prod_price'>{price} РУБ.</p>
          {specialMark()}
      </div>
    );
}

export default ProductMain;
