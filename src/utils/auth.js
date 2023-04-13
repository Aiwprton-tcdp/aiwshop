import axios from 'axios'
import Cookies from 'js-cookie'

const getCookie = async () => await axios.get("csrf-cookie")

const eraseCookie = name => {
  document.cookie = name + '=; Max-Age=-99999999;';
}

const getToken = () => Cookies.get('access')

export const hasToken = () => getToken() != null

export const isAuthenticated = async () => {
  const token = getToken()
  if (token == null) return

  axios.defaults.headers.Authorization = 'Bearer ' + token
  let user = await axios.get("current")
  return user.data.data
}

export const register = async form => {
  return getCookie().then(() => {
    return axios.post("register", form).then(r => {
      Cookies.set('access', r.data.data)
      axios.defaults.headers.Authorization = 'Bearer ' + getToken()
      window.location.reload()
      return true
    }).catch(e => false)
  })
}

export const login = async form => {
  return getCookie().then(() => {
    return axios.post("login", form).then(r => {
      Cookies.set('access', r.data.data)
      axios.defaults.headers.Authorization = 'Bearer ' + getToken()
      window.location.reload()
      return true
    }).catch(e => false)
  })
}

export const logout = () => {
  axios.get("logout").catch(e => console.log(e))
  eraseCookie('access')
  eraseCookie('cart')
  console.log(getToken())
  return hasToken()
}

export const login_to_another = async form => {
  return getCookie().then(() => {
    return axios.post("login_to_another", form).then(r => {
      Cookies.set('access', r.data.data)
      axios.defaults.headers.Authorization = 'Bearer ' + getToken()
      window.location.reload()
      return true
    }).catch(e => false)
  })
}
