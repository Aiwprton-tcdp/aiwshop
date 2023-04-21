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
      <RouterLink :to="{ name: 'charts' }" class="text-gray-900">Диаграммы</RouterLink>
    </li>
  </ul>
</div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'D_Main',
  components: { RouterLink },
}
</script>
