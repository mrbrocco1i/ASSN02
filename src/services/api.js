import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'https://assn01-prod.herokuapp.com/'
  })
}
