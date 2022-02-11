import React, {useState, Component} from "react"
import {Link} from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {num_prods : 0}
    }

    // componentDidMount(){
    //     window.addEventListener("storage", e =>
    //         this.setState({num_prods : localStorage.length})
    //     );
    // }


    render (){
    return (
        <div className="header_block">
            <div className="header">
                <img className="logo_shop" src="/images/alva.png"></img>
            </div>
            <Link to={'/'} className="big_cat first"> ВСЯ ОДЕЖДА</Link>
            <Link to={'/sale'} className="big_cat second"> РАСПРОДАЖА</Link>
            <Link to={'/new'} className="big_cat third"> НОВАЯ КОЛЛЕКЦИЯ</Link>
            <Link to={'/bucket'} className="bucket_button">
                <img className="bucket_img" src="/images/bucket2.png"></img>
            </Link>
        </div>
    );
    }
}

export default Header;