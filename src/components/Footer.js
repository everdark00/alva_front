import React from "react"
import {Link} from 'react-router-dom'

function Footer() {
    return (
        <div className="footer_block">
            <div className="footer_links">
                <Link to="/bucket" className="footer_text">Корзина</Link>
                <p className="footer_text">Информация о магазине</p>
                <Link to="/" className="footer_text">На главную</Link>
            </div>
            <div className="shop_in_sn">
                <p className="footer_text">Мы в социальных сетях:</p>
                <a className="sn_icon" href="https://vk.com/mr.peter_g">
                    <img className="icon_img_square" src="/images/vk.png"></img>
                </a>
                <a className="footer_text" href="https://twitter.com">
                    <img className="icon_img_rect" src="/images/tw.png"></img>
                </a>
                <a className="footer_text" href="https://facebook.com">
                    <img className="icon_img_square" src="/images/fb3.png"></img>
                </a>
            </div>
        </div>
    );
}

export default Footer;