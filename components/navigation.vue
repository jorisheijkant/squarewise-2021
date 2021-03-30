<template>
    <nav class="nav">
        <div class="navbar-wrapper">
            <div class="navbar">
                <div class="nav-left">

                </div>
                <div class="nav-logo">
                    <img class="logo-img" src="../assets/img/logo.png" alt="Squarewise logo">
                </div>
                <div class="menu-toggle" @click="toggleMenu()">
                    <img class="burger-icon" src="../assets/img/burger.png" alt="">
                </div>
            </div>
        </div>
        <div class="menu" :class="{'open': menu}">
            <h2 class="menu__heading">Snel naar</h2>

            <div class="menu__items">
                <button @click="goTo(chapter.slug)" class="menu-item" v-for="(chapter, index) in chapters" :key="`menu-chapter-${index}`">
                   {{chapter.title}}
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: "navigation",

    data() {
        return {
            menu: false
        }
    },

    methods: {
        toggleMenu() {
            this.menu = !this.menu;
        },

        goTo(item) {
            this.menu = false;
            this.$scrollTo(`.${item}`);
        }
    },

    computed: {
        ...mapState(['chapters'])
    }
}
</script>
