import Api from '@/services/api'

export default {
  fetchBeverages () {
    return Api().get('/beverages')
  }
}
