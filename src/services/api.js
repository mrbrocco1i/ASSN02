import axios from 'axios'

export default() => {
  return axios.create({
    //baseURL: 'https://localhost:3000'
    baseURL: 'https://assn01-prod.herokuapp.com/'
  })
}
