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
                    <img class="burger-icon" src="../assets/img/menu-icon.png" alt="">
                </div>
            </div>
            <div class="progress-bar">
                <div class="bar" :style="{'width': progress}"></div>
            </div>
        </div>

        <div class="menu" :class="{'open': menu}" @click="toggleMenu()">
            <div class="menu-wrapper" @click.stop>
                <img class="menu-close" src="../assets/img/cross.svg" alt="close menu" @click.stop="toggleMenu()">

                <h2 class="menu__heading">Snel naar</h2>

                <div class="menu__items">
                    <button @click="goTo(chapter.slug)" class="menu-item" v-for="(chapter, index) in chapters" :key="`menu-chapter-${index}`">
                        {{chapter.title}}
                    </button>
                </div>
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
            let body = document.querySelector('body');
            if(this.menu) {
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
            }
        },

        goTo(item) {
            this.menu = false;
            this.$scrollTo(`.${item}`);
            let body = document.querySelector('body');
            if(this.menu) {
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
            }
        },

        updateProgressIndicator() {
            const { documentElement, body } = document;
            let windowScroll = body.scrollTop || documentElement.scrollTop;
            let height = documentElement.scrollHeight - documentElement.clientHeight;
            this.progress = (windowScroll / height) * 100 + "%";
        }
    },

    beforeDestroy() {
        window.removeEventListener("scroll", this.updateProgressIndicator)
    },

    computed: {
        ...mapState(['chapters'])
    }
}
</script>
