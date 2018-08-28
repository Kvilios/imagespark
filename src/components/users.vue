<template>
  <div class="users">
    <panel />
    <ul class="users-list" v-if="sortedUsersData">
        <user class="users-list-item" v-for="userData, i in sortedUsersData" :key="'user-' + userData.id" :data="userData" />
        <li class="users-list-item preloader" v-observe-visibility="visibilityChanged" v-if="!loadUsersCompleteData"></li>
    </ul>
    <p class="users-empty" v-else>
        Нет данных...
    </p>
    <ul class="users-found-list" v-if="foundUsersData.length">
        <li class="users-found-list-item" v-for="userData in foundUsersData">
            <p class="users-found-list-item-id">
                {{ userData.id }} из {{ sortedUsersData.length }}
            </p>
            <div class="users-found-list-item-image" :class="{ empty: !userData.image }" :style="(userData.image) ? 'background-image: url(../src/assets/' + userData.image + ');' : ''">
                <span class="users-found-list-item-image-label">
                    {{ label(userData.name, userData.secondName) }}
                </span>
            </div>
            <div class="users-found-list-item-wrapper">
                <p class="users-found-list-item-full-name">
                    {{ fullName(userData.name, userData.secondName) }}
                </p>
                <p class="users-found-list-item-position" v-if="userData.position">
                    {{ userData.position }}
                </p>
            </div>
            <p class="users-found-list-item-rating">
                {{ userData.rating }}
            </p>
        </li>
    </ul>
    <p class="users-found-empty" v-else-if="searchData">
        По запросу "{{ searchData }}" нет данных...
    </p>
  </div>
</template>

<script>
    import panel from './panel.vue'
    import user from './user.vue'

    export default {
        name: 'users',
        components: {
            panel,
            user
        },
        created() {
            this.$store.commit('addUsers')
        },
        computed: {
            usersData() {
                return this.$store.getters.usersData
            },
            loadUsersCompleteData() {
                return this.$store.getters.loadUsersCompleteData
            },
            searchData() {
                let result = this.$store.getters.searchData.trim().toLowerCase()
                return result
            },
            foundUsersData() {
                let result = []
                if (this.searchData) {
                    this.sortedUsersData.forEach(el => {
                        let name = el.name.toLowerCase(), secondName = el.secondName.toLowerCase(), fullName = secondName + ' ' + name, fullNameReversed = name + ' ' + secondName
                        if (name.indexOf(this.searchData) >= 0 || secondName.indexOf(this.searchData) >= 0 || fullName.indexOf(this.searchData) >= 0 || fullNameReversed.indexOf(this.searchData) >= 0) result.push(el)
                    })
                }
                return result
            },
            sortedUsersData() {
                let result
                switch (this.$store.getters.sortingByData) {
                    case 0:
                        result = this.sortByKey(this.usersData, 'id')
                        break
                    case 1:
                        result = this.sortByKey(this.usersData, 'age')
                        break
                    case 2:
                        result = this.sortByKey(this.usersData, 'rating').reverse()
                        break
                }
                return result
            }
        },
        methods: {
            visibilityChanged(isVisible) {
                if (isVisible && !this.loadUsersCompleteData) this.$store.dispatch('loadUsers')
            },
            label(name, secondName) {
                return (secondName.charAt(0) + name.charAt(0)).toUpperCase();
            },
            fullName(name, secondName) {
                return secondName + ' ' + name
            },
            sortByKey(array, key) {
                return array.sort(function(a, b) {
                    return ((a[key] < b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0))
                })
            }
        }
    }
</script>

<style lang="scss">
    .users {
        background-color: white;
        max-width: 1024px;
        width: 100%;

        &-list {
            box-sizing: border-box;
            list-style: none;
            margin: 0;
            max-height: 320px;
            overflow-y: auto;
            padding: 8px 0;

            &-item {
                &.user {
                    padding: 8px 16px;
                }

                &.preloader {
                    background: url('../assets/preloader.gif') no-repeat center / contain;
                    height: 32px;
                }
            }
        }

        &-found-list {
            background-color: yellow;
            box-sizing: border-box;
            list-style: none;
            margin: 0;
            max-height: 320px;
            overflow-y: auto;
            padding: 8px 0;

            &-item {
                align-items: center;
                display: flex;
                justify-content: space-between;
                padding: 8px 16px;

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
        }

        &-found-empty {
            color: red;
            margin: 0;
            padding: 16px;
            text-align: center;
        }
    }
</style>
