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
    return Api().put(`/beverages/update/${id}`, beverage,
      { headers: {'Content-type': 'application/json'} })
  },
  postAdmin (admin) {
    return Api().post('/administrators/login', admin,
      { headers: {'Content-type': 'application/json'} })
  },
  postcmt (cmt) {
    return Api().post('/addComment', cmt,
      { headers: {'Content-type': 'application/json'} })
  },
}
