<style scoped></style>

<template>
<nav class="flex items-center w-full p-3 mb-2 space-x-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:py-4 sm:space-x-4">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    <li class="inline-flex items-center">
      <RouterLink :to="{ name: 'current_profile' }" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
        Профиль
      </RouterLink>
    </li>
    <li v-for="(d, index) in data">
      <div class="flex items-center">
        <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        <span v-if="index == data.length - 1" class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
          {{ d }}
        </span>
        <RouterLink v-else :to="{ name: d.toLowerCase() }" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
          {{ d }}
        </RouterLink>
      </div>
    </li>
  </ol>
</nav>
</template>

<script>
export default {
  name: 'Profile_Navigation',
  data() {
    return {
      data: Array(),
    }
  },
}
</script>
