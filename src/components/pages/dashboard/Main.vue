<style scoped></style>

<template>
<div class="">
  <ul class="w-48 ml-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
      <RouterLink :to="{ name: 'users' }" class="text-gray-900">Пользователи</RouterLink>
    </li>
    <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
      <RouterLink :to="{ name: 'goods' }" class="text-gray-900">Товары</RouterLink>
    </li>
    <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
      <RouterLink :to="{ name: 'sales' }" class="text-gray-900">Покупки</RouterLink>
    </li>
    <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
      <RouterLink :to="{ name: 'roles' }" class="text-gray-900">Роли</RouterLink>
    </li>
    <li class="w-full px-4 py-2 border-b">
      <RouterLink :to="{ name: 'charts' }" class="flex gap-2 text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
        Диаграммы
      </RouterLink>
    </li>
  </ul>
</div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'D_Main',
  components: { RouterLink },
}
</script>
