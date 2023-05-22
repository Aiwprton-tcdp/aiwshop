import { reactive } from "vue"
import { io } from "socket.io-client"


// import Echo from "laravel-echo"
// // const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000"
// window.io = io//(URL)

// window.Echo = new Echo({
//   broadcaster: 'socket.io',
//   host: window.location.hostname + ':6001' // this is laravel-echo-server host
// })

// // window.Echo.channel('messages')
// // .listen('ChatEvent', e => {
// //   console.log(e)
// // })

// window.Echo.channel('messages')
// .listen('*', e => {
//   console.log(e)
// })

export const state = reactive({
  connected: false,
  chatEvents: [],
})

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000"

export const socket = io(URL)

socket.on("connect", () => {
  state.connected = true
})

socket.on("disconnect", () => {
  state.connected = false
})

// socket.on("aiwprton_shop:message", () => {
//   console.log("message")
//   console.log(socket.id)
//   state.chatEvents.push(args)
// })
