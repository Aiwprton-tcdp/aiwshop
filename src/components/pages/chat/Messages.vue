<style scoped></style>

<template>
<!-- messages list -->
<div v-if="messages.length > 0" class="flex flex-wrap">
  <button v-if="has_new_messages"
    @click="GetMessages()"
    :disabled="sending"
    :class="{ 'cursor-progress' : sending }"
    class="justify-center rounded-lg focus:outline-none">
    Ещё
  </button>

  <div v-for="m in messages" class="relative w-full py-5">
    <div v-if="m.sender_id == UserData.id" class="group absolute right-0 bottom-3 flex">
      <div v-if="m.deleted_at == null" class="py-1">
        <button @click="DeleteMessage(m.id)"
          title="Удалить"
          :disabled="sending"
          :class="{ 'cursor-progress' : sending }"
          class="justify-center rounded-lg focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 mr-2 text-red-500 hidden group-hover:block">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
        <button @click="EditMessage(m.id)"
          title="Редактировать"
          :disabled="sending"
          :class="{ 'cursor-progress' : sending }"
          class="justify-center rounded-lg focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 mr-2 hidden group-hover:block">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
        </button>
      </div>

      <div :class="{ 'bg-red-200' : m.deleted_at != null }" class="py-1 px-2 bg-blue-100 rounded-md">
        <p>{{ m.content }}</p>
      </div>
    </div>

    <div v-else class="absolute left-0 bottom-3 p-2 bg-gray-100 rounded-md">
      <p>{{ m.content }}</p>
    </div>
  </div>
</div>
<div v-else class="my-4">
  <span>У Вас нет сообщений. Напишите сообщение, чтобы начать диалог</span>
</div>

<!-- message sending -->
<div class="relative flex mt-1 items-center">
  <!-- files -->

  <!-- <label for="files_input" class="cursor-pointer h-6 w-6 text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
      </svg>
  </label>
  <input id="files_input" type="file" ref="files" multiple v-on:change="HandleFileUpload()" class="hidden"/> -->

  <!-- text -->
  <input type="text"
    id="floating_outlined"
    v-model.trim="new_message"
    v-on:keyup.enter="CreateMessage()"
    placeholder=" "
    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:bg-gray-200 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
  
  <label for="floating_outlined" class="absolute text-sm text-gray-500 cursor-text dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Напишите сообщение</label>
  
  <div class="absolute right-0 inset-y-0 gap-3 hidden sm:flex">
    <button v-if="new_message.length > 0" @click="new_message = ''">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
      </svg>
    </button>

    <button @click="CreateMessage()"
      :disabled="sending"
      :class="{ 'cursor-progress' : sending }"
      class="items-center rounded-lg py-2 px-4 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
      <!-- <span class="font-bold">Отправить</span> -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    </button>
  </div>
</div>
</template>

<script>
import { inject } from 'vue'
import { DefaultDate } from '@/utils/DateFormatter.js'

export default {
  name: 'ChatMessages',
  data() {
    return {
      messages: Array(),
      page: Number(1),
      new_message: String(),
      edited: Boolean(),
      sending: Boolean(),
      has_new_messages: Boolean(true),
    }
  },
  setup() {
    const loading = inject('loading')
    const UserData = inject('UserData')
    const UnreadMessagesCount = inject('UnreadMessagesCount')
    const toast = inject('createToast')
    const emitter = inject('emitter')

    return {
      loading,
      UserData,
      UnreadMessagesCount,
      toast,
      emitter,
    }
  },
  mounted() {
    this.GetMessages()

    this.emitter.on('NewUnreadMessage', this.MessagesUpdate)
  },
  methods: {
    MessagesUpdate(data) {
      if (data.chat_id != this.$route.params.id
        || data.sender_id == this.UserData.id) return
      
      this.messages.push(data)
      this.UnreadMessagesCount--
    },
    GetMessages() {
      this.loading = this.page == 1

      let url = `messages?page=${this.page++}
        &chat_id=${this.$route.params.id}
        &limit=10`

      this.ax.get(url).then(r => {
        this.has_new_messages = r.data.data.next_page_url != null
        r.data.data.data.forEach(d => this.messages.unshift(d))
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
        this.$router.push({ name: 'chats' })
      }).finally(() => this.loading = false)
    },
    CreateMessage() {
      if (this.sending || this.new_message == "") return

      const message = this.new_message
      this.new_message = ""
      this.sending = true

      this.messages.push({
        content: message,
        sender_id: this.UserData.id,
      })

      this.ax.post('messages', {
        chat_id: this.$route.params.id,
        content: message
      }).then(r => {
        console.log(r.data.data)
        this.messages[this.messages.length - 1] = r.data.data
      }).catch(e => this.toast(e.response.data.message, 'error'))
        .finally(() => this.sending = false)
    },
    EditMessage(id) {
      if (this.sending || this.new_message == "") return

      const message = this.new_message
      this.new_message = ""
      this.sending = true

      const index = this.messages.findIndex(e => e.id == id)
      this.messages[index].content = message

      this.ax.patch(`messages/${id}`, message).then(r => {
        console.log(r.data.data)
        this.messages[index] = r.data.data
      }).catch(e => this.toast(e.response.data.message, 'error'))
        .finally(() => {
          this.sending = false
          // this.edited = !this.edited
        })
    },
    DeleteMessage(id) {
      this.ax.delete(`messages/${id}`).then(r => {
        console.log(r.data.data)
        const index = this.messages.findIndex(e => e.id == id)
        if (index > -1) this.messages.splice(index, 1)
      }).catch(e => this.toast(e.response.data.message, 'error'))
    },
    Copy() {
      // const element = this.$refs.username
      // element.select()
      // element.setSelectionRange(0, 99999)
      // document.execCommand('copy')
      this.$refs.username.focus()
      document.execCommand('copy')
      // navigator.clipboard.writeText(data)
    },
    FormatDate(date) {
      return DefaultDate(date)
    },
  },
}
</script>
