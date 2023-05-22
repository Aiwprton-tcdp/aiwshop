<style></style>

<template>
<nav class="bg-white p-2 sm:px-4 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div class="container mx-auto flex justify-between">
    <RouterLink :to="{ name: 'main' }" class="flex items-center text-gray-900">
      <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Logo" /> -->
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        Aiwprton shop
      </span>
    </RouterLink>

    <div v-if="this.User == null">
      <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <RouterLink :to="{ name: 'login' }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            Login
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'register' }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            Register
          </RouterLink>
        </li>
      </ul>
    </div>

    <div v-else>
    <div id="navbar-sticky" class="flex flex-wrap">
      <div class="items-center justify-between hidden w-full md:flex md:w-auto" id="mobile-menu-language-select">
        <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <RouterLink :to="{ name: 'main' }" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">
              <div class="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                </svg>
                <p>Товары</p>
              </div>
            </RouterLink>
          </li>
          <li v-if="['admin', 'moderator'].includes(User.role?.name)">
            <RouterLink :to="{ name: 'dashboard' }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'dashboard' }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Сервисы
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'chats' }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              <div class="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
                <p>Чаты</p>
                <p>{{ UnreadMessagesCount }}</p>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
      
      <div class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 dark:text-white">
        <div class="relative" data-popover-target="profile-description" data-popover-placement="bottom-end">
          <img class="w-8 h-8 mr-2 rounded-full" src="@/assets/icons8-male-User-50.png" alt="">
          <span class="bottom-0 left-5 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        <div data-popover id="profile-description" role="tooltip" class="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-fit dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
          <div class="p-3 space-y-2">
            <div class="font-medium truncate">Роль: {{ User.role?.name }}</div>
            <div class="font-medium truncate">{{ User.email }}</div>
            <RouterLink :to="{ name: 'profile', params: { id: User?.id ?? 0 } }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Перейти в профиль
            </RouterLink>
          </div>
          <div data-popper-arrow></div>
        </div>

        <button id="dropdownAvatarNameButton"
          data-dropdown-toggle="dropdownAvatarName"
          class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 dark:text-white" type="button">
            <!-- <span class="sr-only">Open User menu</span> -->
            {{ User.name }}
            <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>

      <!-- Dropdown menu -->
      <div id="dropdownAvatarName" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
        <!-- <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div class="font-medium ">{{ User.rolename }}</div>
          <div class="truncate">{{ User.email }}</div>
        </div> -->

        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
          <li>
            <RouterLink :to="{ name: 'profile', params: { id: User?.id ?? 0 } }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Профиль
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'cart' }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Корзина
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'dashboard' }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'dashboard' }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Настройки
            </RouterLink>
          </li>
        </ul>

        <div class="py-2">
          <RouterLink :to="{ name: 'logout' }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Выйти
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="flex">
        <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
    </div>
  </div>
</nav>
</template>

<script>
import { inject } from 'vue'
import { isAuthenticated } from '@/utils/auth'
import { socket } from '@/utils/socket.js'

export default {
  setup() {
    const UserData = inject('UserData')
    const NewMessage = inject('NewMessage')
    const UnreadMessagesCount = inject('UnreadMessagesCount')
    const emitter = inject('emitter')

    return { UserData, NewMessage, UnreadMessagesCount, emitter }
  },
  data() {
    return {
      User: Object()
    }
  },
  mounted() {
    isAuthenticated().then(d => {
      this.User = this.UserData = d
      this.SocketStart()
    })
  },
  methods: {
    SocketStart() {
      socket.on(`aiwprton_shop:message_${this.UserData.id}`, data => {
        this.NewMessage(data)
      })
    }
  }
}
</script>
