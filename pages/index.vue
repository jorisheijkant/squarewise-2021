<template>
    <div class="container index">
        <!-- Top nav -->
        <navigation />

        <!-- arrow icon -->
        <nav class="arrow-to-top" @click="scrollToTop()">
            <img src="../assets/img/arrow-down.svg" alt=""/>
        </nav>

        <!-- Rest of the content is from Prismic -->
        <SliceZone class="slice-wrapper" type="page" uid="dieke-schutjens" />

        <squarewise-footer />
    </div>
</template>

<script>
import SliceZone from 'vue-slicezone';
import navigation from "~/components/navigation";

import {mapState} from 'vuex';

export default {
    name: 'index',

    components: {SliceZone, navigation},

    computed: {
        ...mapState(['chapters'])
    },

    mounted() {
        this.checkQuery()
    },

    methods: {
        scrollToTop() {
            this.$scrollTo('.nav');
        },

        checkQuery() {
            if(this.$route && this.$route.query && this.$route.query.h) {
                let chapter = this.$route.query.h;

                // Ugly little timeout to prevent DOM rendering issues
                setTimeout(() => {
                    this.$scrollTo(`.${chapter}`, {
                        duration: 0
                    })
                }, 300);
            }
        }
    },

    head() {
        return {
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com'
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap'
                }
            ]
        }
    }
}
</script>
