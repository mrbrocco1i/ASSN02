import Api from '@/services/api'

export default {
  fetchBeverages () {
    return Api().get('/beverages')
  },
  postBeverage (beverage) {
    return Api().post('/beverages/addRecord', beverage,
      { headers: {'Content-type': 'application/json'} })
  },
  incrementAmount (id) {
    return Api().put(`/beverages/addAmount/${id}`)
  },
  deleteRecord (id) {
    return Api().delete(`/beverages/deleteById/${id}`)
  },
  putBeverage (id, beverage) {
    return Api().put(`/beverages/changePrice/${id}`, beverage,
      { headers: {'Content-type': 'application/json'} })
  }
}
