import React, {Component} from "react"
import { useNavigate, Link} from "react-router-dom";
import '../styles/Bucket.css';
import ProductPageBucket from "../components/ProductPageBucket"
import OrderDataService from "../services/OrderDataService";
import emailjs from 'emailjs-com';





class Bucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_goods: [],
      price_sum: 0,
      num_prods: 0,
      act_page: 1,
      bucket_num_prods: 0,
      name: "",
      tel: "",
      mail: "",
      address: "",
      delivery: "",
      payment: "",
      form_flag: "good"
    }
    this.num_unique = 0
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
  }

  componentDidMount(){
    console.log("rendered")
    let bucket = []
    let sum = 0
    let num_prods = 0
    for (let i = 0; i < localStorage.length; ++i) {
      let prod = JSON.parse(localStorage.key(i))
      prod.number = parseInt(localStorage.getItem(localStorage.key(i)))

      sum += prod.price*prod.number
      num_prods += prod.number
      bucket.push(prod)
      this.num_unique += 1
    } 

    this.setState({selected_goods : bucket})
    this.setState({price_sum : sum})
    this.setState({num_prods : num_prods})
    this.setState({bucket_num_prods : localStorage.length})
  }

  showPrev() {
    if (this.state.act_page > 1) {
      this.setState({act_page : this.state.act_page - 1})
    }
  }

  showNext() {
    if (this.state.act_page < Math.floor((this.num_unique - 1)/5) + 1) {
      this.setState({act_page : this.state.act_page + 1})
    }
  }

  showBtns() {
    if (this.num_unique > 5) {
      return (
      <div className="bucket_arrows">
        <button onClick={() => this.showPrev()} className="page_button_bucket">
          <p className="page_button_bucket_text text_up">{"▲"}</p>
        </button>
        <button onClick={() => this.showNext()} className="page_button_bucket">
          <p className="page_button_bucket_text text_down">{"▼"}</p>
        </button>
      </div>
      )
    }
  }

  showBucket() {
    if (localStorage.length > 0) {
        return <div className="num_product">{this.state.bucket_num_prods}</div>
    }
  }
  

  handleSubmitOrder(e) {
    e.preventDefault();
    let bucket_goods_id = []
    for (let i = 0; i < this.state.selected_goods.length; ++i){
      bucket_goods_id.push([
        this.state.selected_goods[i].id,
        this.state.selected_goods[i].number]
      )
    }
    console.log(bucket_goods_id)
    if (this.state.tel === "") {
      this.setState({form_flag : "badTel"})
    } else if (this.state.mail === "") {
      this.setState({form_flag : "badMail"})
    } else if (this.state.delivery === "courier" && this.state.address === "") {
      this.setState({form_flag : "badAdd"})
    } else if (this.state.delivery === "") {
      this.setState({form_flag : "badDel"})
    } else if (this.state.payment === "") {
      this.setState({form_flag : "badPay"})
    } else if (bucket_goods_id.length === 0) {
      this.setState({form_flag : "badBucket"})
    } else {
      let code = Date.now()
      let address = null
      if (this.state.address != "") {
        address = this.state.address
      }
      let order = {
        order_id: code,
        name: this.state.name,
        phone: this.state.tel,
        mail: this.state.mail,
        address: address,
        goods: JSON.stringify(bucket_goods_id),
        price: this.state.price_sum,
        delivery: this.state.delivery,
        payment: this.state.payment,
      }

      OrderDataService.sendOrder(order).then(() => {
        localStorage.clear()
        emailjs.send("service_vxueuwh","template_y6y3afl",{
          custumer_name: order.name,
          customer_mail: order.mail,
          order_code: order.order_id,
          }, 'user_kFn89Se4R65wEIWuBbQLU');
        this.props.navigate('/success')
      })
    }
  }

  badOrderTag() {
    if (this.state.form_flag === "badTel") {
      return <p className="bad_order_tag">Укажите телефон!</p>
    } else if (this.state.form_flag === "badMail") {
      return <p className="bad_order_tag">Укажите почту!</p>
    } else if (this.state.form_flag === "badAdd") {
      return <p className="bad_order_tag">Укажите адрес доставки!</p>
    } else if (this.state.form_flag === "badDel") {
      return <p className="bad_order_tag">Выберите способ доставки!</p>
    } else if (this.state.form_flag === "badPay") {
      return <p className="bad_order_tag">Выберите способ оплаты!</p>
    } else if (this.state.form_flag === "badBucket") {
      return <p className="bad_order_tag">Ваша корзина пуста!</p>
    }
  }

  render() {
    const addProd = (prod_id)=>{
      let to_sum = 0
      let new_selected = this.state.selected_goods
      let prod_ls = {}
      for (let i = 0; i < new_selected.length; ++i) {
        if (new_selected[i].id === prod_id) {
          let old_num = new_selected[i].number
          new_selected[i].number = old_num + 1;
          to_sum = new_selected[i].price
          Object.assign(prod_ls, new_selected[i])
          break;
        }
      }
      delete prod_ls.number
      let prod_ls_key = JSON.stringify(prod_ls)
      let prod_ls_val = localStorage.getItem(prod_ls_key)
      localStorage.setItem(prod_ls_key, parseInt(prod_ls_val) + 1)
      this.setState({selected_goods : new_selected})
      this.setState({price_sum : this.state.price_sum + to_sum})
      this.setState({num_prods : this.state.num_prods + 1})
    }
  
    const removeProd = (prod_id)=>{
      let to_sub = 0
      let new_selected = this.state.selected_goods
      let prod_ls = {}
      for (let i = 0; i < new_selected.length; ++i) {
        if (new_selected[i].id === prod_id) {
          let old_num = new_selected[i].number
          Object.assign(prod_ls, new_selected[i])
          delete prod_ls.number
          let prod_ls_key = JSON.stringify(prod_ls)
          let prod_ls_val = localStorage.getItem(prod_ls_key)
          to_sub = new_selected[i].price
          if (old_num > 1) {
            new_selected[i].number = old_num - 1;
            localStorage.setItem(prod_ls_key, parseInt(prod_ls_val) - 1)
          } else {
            new_selected.splice(i, 1)
            localStorage.removeItem(prod_ls_key)
            this.num_unique -= 1
            if (this.num_unique % 5 == 0 && this.state.act_page > 1) {
              this.setState({act_page: this.state.act_page - 1})
            }
          }
          break;
        }
      }
      this.setState({selected_goods : new_selected})
      this.setState({price_sum : this.state.price_sum - to_sub})
      this.setState({num_prods : this.state.num_prods - 1})
      this.setState({bucket_num_prods : localStorage.length})
    }


    return (
      <div className="bucket_block">
        {this.showBucket()}
        <div className="bucket_body">
          <p className="your_goods_bucket">Ваши товары</p>
          <div className="bucket_header">
            <p className="prod_name_bucket bucket_header_text">наименование товара</p>
            <p className="prod_price_bucket bucket_header_text">цена</p>
            <p className="prod_num_bucket bucket_header_text">кол-во</p>
          </div>
          <ProductPageBucket state={this.state} addProd={addProd} removeProd={removeProd}/>
          <div className="end_bucket_bar"></div>
          <div className="bucket_footer">
            <div className="bucket_stats_block">
              <div className="bucket_stats">
                <p className="bucket_footer_text">товаров в корзине:</p>
                <p className="text_stats">{JSON.stringify(this.state.num_prods) + " шт."}</p>
              </div>
              <div className="bucket_stats">
                <p className="bucket_footer_text">сумма заказа:</p>
                <p className="text_stats">{JSON.stringify(this.state.price_sum) + " РУБ."}</p>
              </div>
            </div>
            {this.showBtns()}
          </div>
        </div>
        <div className="order_body">
          <div className="bad_order">
            {this.badOrderTag()}
          </div>
          <form onSubmit={(e)=>this.handleSubmitOrder(e)} className="order_form">
            <div className="form_block">
              <p className="order_text">Ваше имя:</p>
              <input onChange={(e) => this.setState({name : e.target.value})} value = {this.state.name} name="custumer_name" className="input_form" />
            </div>
            <div className="form_block">
              <p className="order_text">Номер телефона:</p>
              <input onChange={(e) => this.setState({tel : e.target.value})} value = {this.state.tel} className="input_form" type="tel"/>
            </div>
            <div className="form_block">
              <p className="order_text">Электронная почта:</p>
              <input onChange={(e) => this.setState({mail : e.target.value})} value = {this.state.mail} name="custumer_mail" className="input_form" type="email"/>
            </div>
            <div className="form_block">
              <p className="order_text">Адрес доставки:</p>
              <input onChange={(e) => this.setState({address : e.target.value})} value = {this.state.adress} className="input_form" />
            </div>
            <div className="choice_block">
              <p className="order_text">Выберите способ доставки:</p>
              <div className="choice_row">
                <input onChange={(e) => this.setState({delivery : e.target.value})} className="circle_form" name="del" type="radio" value="courier" />
                <p className="choice_text">курьер</p>
              </div>
              <div className="choice_row">
                <input onChange={(e) => this.setState({delivery : e.target.value})} className="circle_form" name="del" type="radio" value="client" />
                <p className="choice_text">самовывоз</p>
              </div>
            </div>
            <div className="choice_block">
              <p className="order_text">Выберите способ оплаты:</p>
              <div className="choice_row">
                <input onChange={(e) => this.setState({payment : e.target.value})} className="circle_form" name="pay" type="radio" value="card" />
                <p className="choice_text">банковская карта</p>
              </div>
              <div className="choice_row">
                <input onChange={(e) => this.setState({payment : e.target.value})} className="circle_form" name="pay" type="radio" value="cash" />
                <p className="choice_text">наличные</p>
              </div>
            </div>
            <div>
              <input className="submit_order" type="submit" value="ОФОРМИТЬ ЗАКАЗ"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const withNavigate = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };

  return Wrapper;
};

export default withNavigate(Bucket);
