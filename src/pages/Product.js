import React, {Component} from "react"
import ProductDataService from "../services/ProductDataService";
import { useParams } from "react-router-dom";
import "../styles/Product.css";


class Product extends Component{
    constructor(props) {
      super(props);
      this.state = {
        product: {}, 
        bucket_num_prods: 0
      }
      this.added = false
      this.addToBucket = this.addToBucket.bind(this);
    }

    componentDidMount(){
      let id = this.props.params.pk;
      ProductDataService.getProd(id).then(ret=>{
        this.setState({product : ret.data})
      })
      this.setState({bucket_num_prods: localStorage.length})
    }

    specialMark() {
      if (this.state.product.sale === true) {
        return <p className='sale_mark'>SALE!</p>
      } else if (this.state.product.new_col === true) {
        return <p className='new_mark'>New collection!</p>
      } else return <p className='empty_mark'></p>
    }

    addToBucket(){
      let prod_key = JSON.stringify(this.state.product)
      if (localStorage.getItem(prod_key) != null){
        let num_prods = parseInt(localStorage.getItem(prod_key))
        localStorage.setItem(prod_key, num_prods + 1)
      } else {
        localStorage.setItem(prod_key, 1)
      }
      this.added = true
      this.setState({bucket_num_prods : localStorage.length})
    }

    addedTag(){
      if (this.added === true) {
        return <p className="product_added_tag">Товар добавлен в корзину!</p>
      }
    }

    showBucket() {
      if (localStorage.length > 0) {
          return <div className="num_product">{this.state.bucket_num_prods}</div>
      }
    }

    render(){
      return (
        <div className="product_block">
          {this.showBucket()}
          <div className="product_background">
              <img src={'/' + this.state.product.image_path} className="photos"></img>
              <div className="description">
                <div className="name_block">
                  <p className="name">{this.state.product.title}</p>
                </div>
                <p className="price">{this.state.product.price + " РУБ."}</p>
                {this.specialMark()}
                <div className="desc_block">
                  <p className="desc">{this.state.product.description}</p>
                </div>
                {this.addedTag()}
                <button onClick={() => this.addToBucket()} className="add_button">ДОБАВИТЬ В КОРЗИНУ</button>
              </div>
          </div>
        </div>
      );
    }
}

const withRouter = WrappedComponent => props => {
  const params = useParams();

  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};

export default withRouter(Product);
