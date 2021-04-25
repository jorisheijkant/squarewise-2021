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
            <div class="progress-bar">
                <div class="bar" :style="{'width': progress}"></div>
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
            menu: false,
            progress: "1%"
        }
    },

    mounted() {
        window.addEventListener("scroll", this.updateProgressIndicator);
    },

    methods: {
        toggleMenu() {
            this.menu = !this.menu;
        },

        goTo(item) {
            this.menu = false;
            this.$scrollTo(`.${item}`);
        },

        updateProgressIndicator() {
            const { documentElement, body } = document;
            let windowScroll = body.scrollTop || documentElement.scrollTop;
            let height = documentElement.scrollHeight - documentElement.clientHeight;
            this.progress = (windowScroll / height) * 100 + "%";
        }
    },

    computed: {
        ...mapState(['chapters'])
    }
}
</script>
