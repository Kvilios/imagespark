<template>
  <div class="panel">
    <div class="panel-wrapper">
        <h1 class="panel-title">
            Рейтинг участников
        </h1>
        <input class="panel-search" type="text" placeholder="Поиск" v-model="searchData">
    </div>
    <ul class="panel-sorting-list">
        <li class="panel-sorting-list-item" :class="{ active: sortingByData === 1 }" @click="updateSortingBy(1)">
            <a class="panel-sorting-list-item-link">
                По возрасту
            </a>
        </li>
        <li class="panel-sorting-list-item" :class="{ active: sortingByData === 2 }" @click="updateSortingBy(2)">
            <a class="panel-sorting-list-item-link">
                По рейтингу
            </a>
        </li>
        <li class="panel-sorting-list-item" :class="{ active: sortingByData === 0 }" @click="updateSortingBy(0)">
            <a class="panel-sorting-list-item-link">
                Сбросить сортировку
            </a>
        </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: 'panel',
        computed: {
            sortingByData() {
                return this.$store.getters.sortingByData
            },
            searchData: {
                get() {
                    return this.$store.getters.searchData
                },
                set(value) {
                    this.$store.commit('updateSearch', value)
                }
            }
        },
        methods: {
            updateSortingBy(id) {
                this.$store.commit('updateSortingBy', id)
            }
        }
    }
</script>

<style lang="scss">
    .panel {
        padding: 16px;

        &-wrapper {
            align-items: center;
            display: flex;
            justify-content: space-between;
            margin-bottom: 16px;
        }

        &-title {
            margin: 0 16px 0 0;
        }

        &-search {
            border: 1px solid gray;
            padding: 4px 16px;

            &:focus {
                outline: none;
            }
        }

        &-sorting-list {
            align-items: center;
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;

            &-item {
                margin-right: 16px;

                &:last-child {
                    margin-right: 0;
                }

                &-link {
                    border-bottom: 1px dashed black;
                    cursor: pointer;
                    display: inline-block;
                    padding-bottom: 1px;
                    transition: all .2s ease-in-out;

                    &:hover {
                        border-bottom-color: rgba(black, 0);
                    }
                }

                &.active &-link {
                    border-bottom-color: rgba(black, 0);
                    font-weight: bold;
                }
            }
        }
    }
</style>
