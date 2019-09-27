import axios from 'axios'
const xAuthToken = localStorage.getItem('x-auth-token')

export const HTTP = axios.create({
  baseURL: `http://192.168.71.76:8000`,
  transformRequest: [function (data, headers) {
    headers['Authorization'] = xAuthToken
    return JSON.stringify(data)
  }],
  headers: {
    'x-auth-token': xAuthToken,
    'Content-Type': 'application/json'
  } 
})