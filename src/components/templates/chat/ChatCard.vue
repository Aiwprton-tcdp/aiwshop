<style></style>

<template>
<div class="flex flex-col gap-1 w-fit p-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
  <div class="flex gap-3 place-content-between z-10">
    <label class="text-xl text-red-500">{{ data.new_messages_count }}</label>
    <label :title="data.user_id">{{ data.username }}</label>
    <input :value="data.username" v-on:focus="$event.target.select()" ref="username" class="opacity-0 w-1 cursor-default" readonly />
    <button @click="Copy()" class="rounded-lg p-1 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 hover:text-blue-700">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
      </svg>
    </button>
  </div>
  <div class="flex gap-3 place-content-between">
    <label>ID ответственного:</label>
    <label>{{ data.admin_id }}</label>
  </div>
  <div class="flex gap-3 place-content-between">
    <label>Запретить отвечать</label>
    <label class="relative inline-flex items-center cursor-pointer">
      <input :checked="data.readonly" v-model="data.readonly" type="checkbox" class="sr-only peer" :disabled="!editing">
      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
    </label>
  </div>
  <div class="flex gap-3 place-content-between">
    <label>Разрешить автоудаление</label>
    <label class="relative inline-flex items-center cursor-pointer">
      <input :checked="data.autodelete" v-model="data.autodelete" type="checkbox" class="sr-only peer" :disabled="!editing">
      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
    </label>
  </div>
  <div v-if="data.autodelete" class="flex gap-3 place-content-between">
    <label>Дата автоудаления</label>
    <label class="max-w-lg mb-6 text-sm dark:text-gray-400">
      {{ data.expires_at }}
    </label>
  </div>

  <div class="flex mt-3 place-content-between">
    <div class="flex gap-1">
      <button v-if="!editing" @click="ShowChat()" class="rounded-lg p-1 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      </button>
      <div v-else>
        <button v-if="!edit_waiting"
        @click="EditChat()"
        class="rounded-lg p-1 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
          </svg>
        </button>
        <svg v-else aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
      </div>
      <button v-if="data.deleted_at == null && !editing" @click="editing = !editing" class="rounded-lg p-1 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>
    </div>
    <button v-if="['admin', 'moderator'].includes(UserData.role?.name) && data.deleted_at == null" @click="DeleteChat()" class="rounded-lg p-1 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    </button>
  </div>
</div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: "ChatCard",
  props: {
    data: Object(),
  },
  data() {
    return {
      editing: Boolean(),
      edit_waiting: Boolean(),
    }
  },
  setup() {
    const toast = inject('createToast')
    const UserData = inject('UserData')

    return { toast, UserData }
  },
  methods: {
    ShowChat() {
      this.$router.push({ name: 'chat', params: { id: this.data.id } })
    },
    EditChat() {
      this.editing = true
      this.edit_waiting = true

      this.ax.patch(`chats/${this.data.id}`, this.data).then(r => {
        console.log(r.data.data)
        this.toast('Настройки чата успешно отредактированы', 'success')
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
      }).finally(() => {
        this.editing = false
        this.edit_waiting = false
      })
    },
    DeleteChat() {
      this.ax.delete(`chats/${this.data.id}`).then(r => {
        console.log(r.data.data)
        const index = this.$parent.chats.findIndex(e => e.id == this.data.id)
        if (index > -1) this.$parent.chats.splice(index, 1)
        this.toast('Чат успешно удалён', 'success')
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
      }).finally(() => {
        this.editing = false
        this.edit_waiting = false
      })
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
  }
}
</script>
