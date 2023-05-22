<style scoped></style>

<template>
<!-- chats list -->
<div class="flex items-end text-left my-10">
  <h2 class="text-3xl mr-10">Чаты</h2>
  <button @click="GetAlternativelyActiveChats()" class="text-sm pb-1 no-underline hover:underline decoration-dotted underline-offset-4">
    <p v-if="!only_deleted">к завершённым</p>
    <p v-else>к активным</p>
  </button>
</div>

<div v-if="chats.length > 0" class="flex flex-wrap gap-3">
  <ChatCard v-for="c in chats" :data="c" />

  <div v-if="has_new_chats" class="flex items-center">
    <button v-if="!getting_chats" @click="GetChats()" title="Ещё" class="text-blue-500">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
    <div v-else>
      <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
    </div>
  </div>
</div>
<div v-else class="my-4">
  <span>У Вас нет активных чатов. Начните диалог с пользователем из списка ниже</span>
</div>

<!-- users list -->
<div class="flex items-center gap-3 text-left my-10">
  <h2 class="text-3xl ">Пользователи</h2>
  <RouterLink :to="{ name: 'users' }" class="block text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  </RouterLink>
  <button :class="{ 'invisible': !can_create_chat }"
    class="block max-w-sm my-4 ml-10 py-1 px-2 bg-blue-100 border border-blue-300 rounded-lg shadow cursor-pointer hover:bg-blue-200 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700"
    data-drawer-target="drawer-top-example"
    data-drawer-show="drawer-top-example"
    data-drawer-placement="top"
    aria-controls="drawer-top-example">
    Создать диалог
  </button>
</div>

<div :class="{ 'invisible': users.length == 0 }" class="flex flex-wrap gap-4 text-center">
  <button v-for="u in users"
    @click="SelectUser(u)"
    :class="{
      'bg-green-300 hover:bg-green-400' : UserData.id == u.id,
      'bg-gray-100 hover:bg-gray-300' : selected_user?.id == u.id
    }"
    class="block max-w-sm py-1 px-2 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    {{ u.name }}
  </button>

  <div v-if="has_new_users" class="flex items-center">
    <button v-if="!getting_users" @click="GetUsers()" title="Ещё" class="text-blue-500">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
    <div v-else>
      <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
    </div>
  </div>
</div>

<!-- create chat -->
<div id="drawer-top-example" class="fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform -translate-y-full bg-white dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-top-label">
  <h5 id="drawer-top-label" class="inline-flex items-center mb-4 text-base font-semibold dark:text-gray-400">
    {{ selected_user?.name }}
  </h5>
  <button data-drawer-hide="drawer-top-example" aria-controls="drawer-top-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    <span class="sr-only">Close menu</span>
  </button>

  <div class="flex gap-4">
    <div class="flex gap-2">
      <label>Запретить отвечать</label>
      <label class="relative inline-flex items-center cursor-pointer">
        <input v-model="chat_settings.readonly" type="checkbox" class="sr-only peer" checked>
        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      </label>
    </div>
    <div class="flex gap-2">
      <label>Разрешить автоудаление</label>
      <label class="relative inline-flex items-center cursor-pointer">
        <input v-model="chat_settings.autodelete" type="checkbox" class="sr-only peer" checked>
        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      </label>
    </div>
    <div v-if="chat_settings.autodelete" class="flex gap-2">
      <label>Дата автоудаления</label>
      <label class="max-w-lg mb-6 text-sm dark:text-gray-400">
        {{ chat_settings.expires_at }}
      </label>
    </div>
  </div>

  <button @click="ResetChatSettings()" class="px-4 py-2 text-sm font-medium text-center text-red-700 bg-white border border-red-200 rounded-lg focus:outline-none hover:bg-red-100 focus:z-10 focus:ring-1 focus:ring-red-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
    Сбросить
  </button>
  <button @click="CreateChat()"
    data-drawer-hide="drawer-top-example"
    class="px-4 py-2 text-sm font-medium text-center text-green-700 bg-white border border-green-200 rounded-lg focus:outline-none hover:bg-green-100 focus:z-10 focus:ring-1 focus:ring-green-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
    Принять
  </button>
</div>
</template>

<script>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { DefaultDate } from '@/utils/DateFormatter.js'
import ChatCard from '@/components/templates/chat/ChatCard.vue'

export default {
  name: 'ChatsList',
  components: { ChatCard, RouterLink },
  data() {
    return {
      chats: Array(),
      users: Array(),
      chats_page: Number(1),
      users_page: Number(1),
      has_new_chats: Boolean(true),
      has_new_users: Boolean(true),
      only_deleted: Boolean(),
      can_create_chat: Boolean(),
      selected_user: Object(),
      chat_settings: Object(),
      getting_chats: Boolean(),
      getting_users: Boolean(),
      UnreadMessages: Array(),
    }
  },
  setup() {
    const loading = inject('loading')
    const UserData = inject('UserData')
    const toast = inject('createToast')
    const emitter = inject('emitter')
    
    return {
      loading,
      UserData,
      toast,
      emitter,
    }
  },
  mounted() {
    this.GetChats()
    this.GetUsers()
    this.ResetChatSettings()

    this.emitter.on('NewUnreadMessage', this.ListUpdate)
  },
  methods: {
    ListUpdate(data) {
      this.chats.forEach(chat => {
        if (chat.id == data.chat_id) {
          chat.new_messages_count++
          return
        }
      })
    },
    GetChats() {
      this.getting_chats = true
      this.loading = this.chats_page == 1
      let url = `chats?page=${this.chats_page++}
        &only_deleted=${this.only_deleted}
        &limit=5`

      this.ax.get(url).then(r => {
        r.data.data.data.forEach(d => {
          d.new_messages_count = 0
          this.chats.push(d)
        })
        this.has_new_chats = r.data.data.to != r.data.data.total
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
      }).finally(() => {
        this.getting_chats = false
        this.loading = false
      })
    },
    GetUsers() {
      this.getting_users = true
      let url = `users?page=${this.users_page}&limit=10`

      this.ax.get(url).then(r => {
        this.users = this.users_page++ == 1
          ? r.data.data.data
          : Array.prototype.concat(this.users, r.data.data.data)
        
        this.has_new_users = r.data.data.to != r.data.data.total
      }).catch(e => this.toast(e.response.data.message, 'error'))
      .finally(() => this.getting_users = false)
    },
    SelectUser(user) {
      this.can_create_chat = true
      this.selected_user = user
    },
    ResetChatSettings() {
      this.chat_settings = {
        readonly: false,
        autodelete: false,
        expires_at: null,
      }
    },
    CreateChat() {
      this.ax.post('chats', {
        user_id: this.selected_user.id,
        readonly: this.chat_settings.readonly,
        autodelete: this.chat_settings.autodelete,
        expires_at: this.chat_settings.expires_at,
      }).then(r => {
        let new_chat = r.data.data
        new_chat.username = this.selected_user.name
        this.chats.unshift(new_chat)
        this.can_create_chat = false
        this.selected_user = null
        this.toast('Чат успешно создан', 'success')
      }).catch(e => this.toast(e.response.data.message, 'error'))
    },
    GetAlternativelyActiveChats() {
      this.only_deleted = !this.only_deleted
      this.chats.length = 0
      this.chats_page = 1
      this.GetChats()
    },
    FormatDate(date) {
      return DefaultDate(date)
    },
  },
}
</script>
