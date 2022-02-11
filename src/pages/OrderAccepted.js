import React, {Component} from "react"
import {Link} from "react-router-dom";
import "../styles/OrderAccepted.css";

class OrderAccepted extends Component{
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <div className="success_body">
                <div className="success_block">
                    <p className="success_header">Ваш заказ успешно оформлен!</p>
                    <p className="success_mail">Код заказа выслан на указанный вами почтовый адрес</p>
                    <div className="success_getaway">
                        <Link to="/" className="success_getaway_text">ВЕРНУТЬСЯ НА ГЛАВНУЮ</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderAccepted;