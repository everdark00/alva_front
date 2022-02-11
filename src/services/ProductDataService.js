import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/alva_back/'

const api = axios.create({
    baseURL: baseUrl
  });

class ProductDataService{
    getProds(){
        return api.get(baseUrl+'products/')
    }
    getProdsByCat(cat){
        return api.get(baseUrl+`cats?cat=${cat}`)
    }
    getSaleProds(){
        return api.get(baseUrl+'sale/')
    }
    getNewProds(){
        return api.get(baseUrl+'new_col/')
    }
    getProd(id){
        return api.get(baseUrl+`product/${id}`)
    }
}

export default new ProductDataService();