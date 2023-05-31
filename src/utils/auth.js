import axios from 'axios'
import Cookies from 'js-cookie'

const getCookie = async () => await axios.get('csrf-cookie')
const eraseCookie = name => document.cookie = `${name}=; Max-Age=-99999999;`
const getToken = () => Cookies.get('access')

export const hasToken = () => getToken() != null

export const isAuthenticated = async () => {
  const token = getToken()
  if (token == null) return

  axios.defaults.headers.Authorization = 'Bearer ' + token
  let user = await axios.get('current')
  return user.data.data
}

export const register = async form => {
  return getCookie().then(() => {
    return axios.post('register', form).
      then(r => saveData(r.data.data)).
      catch(e => false)
  })
}

export const login = async form => {
  return getCookie().then(() => {
    return axios.post('login', form).
      then(r => saveData(r.data.data)).
      catch(e => false)
  })
}

export const logout = async () => {
  return axios.get('logout').then(r => {
    console.log(r.data.data)
    if (r.data.data != true) return
    
    eraseCookie('access')
    eraseCookie('cart')
  }).catch(console.error)
}

export const login_to_another = async form => {
  return getCookie().then(() => {
    return axios.post('login_to_another', form).
      then(r => saveData(r.data.data)).
      catch(e => false)
  })
}

const saveData = data => {
  Cookies.set('access', data)
  axios.defaults.headers.Authorization = 'Bearer ' + getToken()
  window.location.reload()
  return true
}
