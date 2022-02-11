import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/alva_back/'

const api = axios.create({
    baseURL: baseUrl
  });

class OrderDataService{
    sendOrder(order) {
        return api.post(baseUrl+'create_order/', order)
    }
}

export default new OrderDataService();