<template>
<Header />

<div class="my-14">
  <Alerts v-if="this.errored" />
  <!-- <Loading v-if="this.loading" /> -->
  <Loading :class="{ invisible: !this.loading }" class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-white z-50 overflow-hidden" />

  <div>
    <RouterView />
  </div>
</div>
</template>

<script>
import { provide, ref } from 'vue'
import Header from '@/components/templates/navigation/Header.vue'
import Alerts from '@/components/templates/states/Alerts.vue'
import Loading from '@/components/templates/states/Loading.vue'
import { isAuthenticated } from '@/utils/auth'

export default {
  components: {
    "Header": Header,
    "Alerts": Alerts,
    "Loading": Loading,
  },
  setup() {
    const errored = ref(false)
    const loading = ref(false)
    const UserData = ref(Object())
    const updateStatesData = () => {
      errored.value = false
      loading.value = false
      UserData.value = new Object()
    }
    
    provide('errored', errored)
    provide('loading', loading)
    provide('UserData', UserData)
    provide('updateStatesData', updateStatesData)

    return {
      errored,
      loading,
      UserData,
      updateStatesData,
    }
  },
  methods: {
    updateStatesData() {
      errored = false
      loading = false
      UserData = new Object()
    },
    async returnUserData() {
      await isAuthenticated().then(d => this.UserData = d)
    },
  },
}
</script>
