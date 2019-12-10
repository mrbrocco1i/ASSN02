import Api from '@/services/api'

export default {
  fetchBeverages () {
    return Api().get('/beverages')
  },
  postBeverage (beverage) {
    return Api().post('/beverages/addRecord', beverage,
      { headers: {'Content-type': 'application/json'} })
  }
}
