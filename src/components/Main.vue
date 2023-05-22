<template>
<Header />

<div class="my-14">
  <!-- <Loading v-if="this.loading" /> -->
  <Loading :class="{ invisible: !this.loading }" class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-white z-50 overflow-hidden" />
  <RouterView />
</div>
</template>

<script>
import { provide, ref } from 'vue'
import Header from '@/components/templates/navigation/Header.vue'
import Loading from '@/components/templates/states/Loading.vue'
import { useToast } from 'vue-toastification'
import Emitter from 'tiny-emitter'

export default {
  components: { Header, Loading },
  setup() {
    const errored = ref(Boolean())
    const loading = ref(Boolean())
    const UserData = ref(Object())
    const UnreadMessagesCount = ref(Number())
    const UnreadMessages = ref(Array())
    const emitter = ref(new Emitter())

    const toast = useToast()
    const createToast = (text, type) => {
      switch (type) {
        case 'error':
          toast.error(text)
          break
        case 'success':
          toast.success(text)
          break
        case 'warning':
          toast.warning(text)
          break
      
        default:
          toast.info(text)
          break
      }
    }
    
    const NewMessage = function(data) {
      UnreadMessagesCount.value++
      this.emitter.emit('NewUnreadMessage', data)
    }
    
    provide('errored', errored)
    provide('loading', loading)
    provide('UserData', UserData)
    provide('UnreadMessages', UnreadMessages)
    provide('UnreadMessagesCount', UnreadMessagesCount)
    provide('createToast', createToast)
    provide('NewMessage', NewMessage)
    provide('emitter', emitter)

    return {
      errored,
      loading,
      UserData,
      UnreadMessages,
      UnreadMessagesCount,
      createToast,
      NewMessage,
      emitter,
    }
  },
}
</script>
