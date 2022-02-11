import React, {Component} from "react"
import '../styles/Main.css';
import '../styles/Header.css';
import ProductPageMain from "../components/ProductPageMain";
import ProductPagesButtons from "../components/ProductPagesButtons";
import CategoryMenu from "../components/CategoryMenu";
import ProductDataService from "../services/ProductDataService";


class Main extends Component {
    constructor(props) {
      super(props);
      this.state = {
        goods : [],
        pages : [],
        activePage : 1,
      }
      this.goods = []
    }

    updatePageButtons(numElems) {
        let pageNums = []
        for (let i = 1; i < (numElems/10 + 1); ++i) {
            pageNums.push(i);
        }
        this.setState({pages : pageNums})
    }

    componentDidMount() {
      ProductDataService.getProds().then(ret => {
          this.goods = ret.data
          this.setState({goods : ret.data})
          let numElems = ret.data.length
          this.updatePageButtons(numElems)
      })
    }

    showBucket() {
        if (localStorage.length > 0) {
            return <div className="num_product">{localStorage.length}</div>
        }
    }
  
  render() {
    const goToPage = (numButton)=>{
        this.setState({activePage : numButton})
        console.log(numButton)
        console.log(this.state.activePage)
   }

   const goToNextPageLeft = (prevPage)=>{
        if (prevPage > 1) {
            prevPage -= 1;
            this.setState({activePage : prevPage})
        }
    }

    const goToNextPageRight = (prevPage)=>{
        if (prevPage < this.state.pages.length) {
            prevPage += 1;
            this.setState({activePage : prevPage})
        }
    }

    const showCat = (cat)=> {
        this.setState({goods : this.goods.filter(elem => elem.category === cat)})
        let numElems = this.goods.filter(elem => elem.category === cat).length
        this.updatePageButtons(numElems)
    }

    const showAll = ()=>{
        this.setState({goods : this.goods})
        this.updatePageButtons(this.goods.length)
    }

    return (
        <div className="main_block">
            {this.showBucket()}
            <ProductPageMain state={this.state}/>
            <ProductPagesButtons state={this.state}  goToPage={goToPage} goToNextPageRight={goToNextPageRight} goToNextPageLeft={goToNextPageLeft}/>
            <CategoryMenu showCat={showCat} showAll={showAll}/>
        </div>
    )
  };
}

export default Main;
