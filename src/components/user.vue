<template>
  <li class="user" :title="'Возраст (лет): ' + data.age">
      <p class="user-id">
          {{ data.id }}
      </p>
      <div class="user-image" :class="{ empty: !data.image }" :style="(data.image) ? 'background-image: url(../src/assets/' + data.image + ');' : ''">
          <span class="user-image-label">
              {{ label(data.name, data.secondName) }}
          </span>
      </div>
      <div class="user-wrapper">
        <p class="user-full-name">
            {{ fullName(data.name, data.secondName) }}
        </p>
        <p class="user-position" v-if="data.position">
            {{ data.position }}
        </p>
      </div>
      <p class="user-rating">
          {{ data.rating }}
      </p>
  </li>
</template>

<script>
    export default {
        name: 'user',
        props: ['data'],
        methods: {
            label(name, secondName) {
                return (secondName.charAt(0) + name.charAt(0)).toUpperCase();
            },
            fullName(name, secondName) {
                return secondName + ' ' + name
            }
        }
    }
</script>

<style lang="scss">
  .user {
      align-items: center;
      display: flex;
      justify-content: space-between;

      &-id {
          margin: 0;
      }

      &-image {
          align-items: center;
          background-color: darkgray;
          border-radius: 50%;
          display: flex;
          height: 100px;
          justify-content: center;
          margin: 0 16px;
          width: 100px;

          &:not(.empty) {
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
          }

          &:not(.empty) &-label {
              display: none;
          }

          &-label {
              color: white;
              font-size: 40px;
          }
      }

      &-wrapper {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: center;
          margin-right: 16px;
      }

      &-full-name {
          font-size: 20px;
          font-weight: bold;
          margin: 0;
      }

      &-position {
          color: gray;
          margin: 4px 0 0;
      }

      &-rating {
          margin: 0;
      }
  }
</style>
