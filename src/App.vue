<template>
  <div id="app">
    <users />
  </div>
</template>

<script>
  import users from './components/users.vue'

  export default {
    name: 'app',
    components: { users },
    mounted() {
      alert('1. Все пользователи читаются из предоставленного файла "users.json";\n\n2. Подгрузка пользователей происходит по три шт. при прокрутке до прелоадера;\n\n3. Два типа сортировки + сброс;\n\n4. Моментальный поиск по пользователям;\n\n5. Добавлены аватарки + должности.\n\nP.S. Данные возраста доступны по наведению на пользователя!')
    }
  }
</script>

<style lang="scss">
  html,
  body {
    height: 100%;
    margin: 0;
    width: 100%;

    #app {
      align-items: center;
      background-color: lightgray;
      display: flex;
      font-size: 16px;
      justify-content: center;
      min-height: 100%;
      min-width: 320px;
      width: 100%;
    }
  }
</style>
