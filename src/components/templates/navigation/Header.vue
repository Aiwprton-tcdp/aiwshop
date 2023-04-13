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

    <div v-if="isGuest">
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
              Товары
            </RouterLink>
          </li>
          <li v-if="['admin', 'moderator'].includes(user.role?.name)">
            <RouterLink :to="{ name: 'dashboard' }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'dashboard' }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Services
            </RouterLink>
          </li>
        </ul>
      </div>
      
      <div class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 dark:text-white">
        <div class="relative" data-popover-target="profile-description" data-popover-placement="bottom-end">
          <img class="w-8 h-8 mr-2 rounded-full" src="@/assets/icons8-male-user-50.png" alt="">
          <span class="bottom-0 left-5 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        <div data-popover id="profile-description" role="tooltip" class="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-fit dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
          <div class="p-3 space-y-2">
            <div class="font-medium truncate">Роль: {{ user.role?.name }}</div>
            <div class="font-medium truncate">{{ user.email }}</div>
            <RouterLink :to="{ name: 'profile', params: { id: user?.id ?? 0 } }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Перейти в профиль
            </RouterLink>
          </div>
          <div data-popper-arrow></div>
        </div>

        <button id="dropdownAvatarNameButton"
          data-dropdown-toggle="dropdownAvatarName"
          class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 dark:text-white" type="button">
            <!-- <span class="sr-only">Open user menu</span> -->
            {{ user.name }}
            <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>

      <!-- Dropdown menu -->
      <div id="dropdownAvatarName" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
        <!-- <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div class="font-medium ">{{ user.rolename }}</div>
          <div class="truncate">{{ user.email }}</div>
        </div> -->

        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
          <li>
            <RouterLink :to="{ name: 'profile', params: { id: user?.id ?? 0 } }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
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

export default {
  setup() {
    const errored = inject('errored')
    const loading = inject('loading')
    const UserData = inject('UserData')
    const updateStatesData = inject('updateStatesData')

    return {
      errored,
      loading,
      UserData,
      updateStatesData,
    }
  },
  data() {
    return {
      user: Object(),
      isGuest: Boolean(),
    }
  },
  mounted() {
    this.$parent.returnUserData().then(() => {
      console.log(this.UserData)
      console.log(this.user)
      this.user = this.UserData
      this.isGuest = this.user == null
    })
  },
}
</script>
